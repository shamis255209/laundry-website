'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';
import { SERVICE_TYPES, TIME_SLOTS } from '@/lib/constants';
import { CheckCircle, Loader2, AlertCircle } from 'lucide-react';

const schema = z.object({
  name: z.string().min(2, '請輸入姓名（至少 2 個字）'),
  phone: z.string().regex(/^[0-9()\-\s+]{8,15}$/, '請輸入有效的電話號碼'),
  email: z.string().email('請輸入有效的 Email').or(z.literal('')).optional(),
  address: z.string().min(5, '請輸入完整地址（至少 5 個字）'),
  booking_date: z.string().min(1, '請選擇收送日期').refine((val) => {
    const selected = new Date(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selected >= today;
  }, '日期不能早於今天'),
  booking_time: z.string().min(1, '請選擇收送時段'),
  services: z.array(z.string()).min(1, '請至少選擇一項服務'),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function BookingForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { services: [] },
  });

  const selectedServices = watch('services') ?? [];

  const toggleService = (value: string) => {
    const current = selectedServices;
    const updated = current.includes(value)
      ? current.filter((s) => s !== value)
      : [...current, value];
    setValue('services', updated, { shouldValidate: true });
  };

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    try {
      const { error } = await supabase.from('bookings').insert([{
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        address: data.address,
        booking_date: data.booking_date,
        booking_time: data.booking_time,
        services: data.services,
        notes: data.notes || null,
        status: 'pending',
      }]);
      if (error) throw error;
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-[var(--color-primary-500)]" />
        </div>
        <h3 className="text-2xl font-bold text-[var(--color-neutral-900)] mb-3 font-[var(--font-heading)]">
          預約成功！
        </h3>
        <p className="text-[var(--color-neutral-500)] max-w-sm leading-relaxed mb-8">
          我們已收到您的預約，將於 24 小時內以電話確認收送時間，請保持電話暢通。
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="px-8 py-3 bg-[var(--color-primary-500)] text-white rounded-full font-medium hover:bg-[var(--color-primary-600)] transition-colors"
        >
          再次預約
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

      {/* 姓名 & 電話 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-[var(--color-neutral-700)] mb-1.5">
            姓名 <span className="text-red-500">*</span>
          </label>
          <input
            {...register('name')}
            placeholder="王小明"
            className="w-full px-4 py-3 rounded-xl border border-[var(--color-neutral-200)] focus:outline-none focus:border-[var(--color-primary-400)] focus:ring-2 focus:ring-[var(--color-primary-100)] transition-all"
          />
          {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-neutral-700)] mb-1.5">
            電話 <span className="text-red-500">*</span>
          </label>
          <input
            {...register('phone')}
            placeholder="0912-345-678"
            className="w-full px-4 py-3 rounded-xl border border-[var(--color-neutral-200)] focus:outline-none focus:border-[var(--color-primary-400)] focus:ring-2 focus:ring-[var(--color-primary-100)] transition-all"
          />
          {errors.phone && <p className="mt-1.5 text-xs text-red-500">{errors.phone.message}</p>}
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-neutral-700)] mb-1.5">
          Email <span className="text-[var(--color-neutral-400)] text-xs">（選填）</span>
        </label>
        <input
          {...register('email')}
          type="email"
          placeholder="example@email.com"
          className="w-full px-4 py-3 rounded-xl border border-[var(--color-neutral-200)] focus:outline-none focus:border-[var(--color-primary-400)] focus:ring-2 focus:ring-[var(--color-primary-100)] transition-all"
        />
        {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>}
      </div>

      {/* 收送地址 */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-neutral-700)] mb-1.5">
          收送地址 <span className="text-red-500">*</span>
        </label>
        <input
          {...register('address')}
          placeholder="台中市西區民生路 XX 號"
          className="w-full px-4 py-3 rounded-xl border border-[var(--color-neutral-200)] focus:outline-none focus:border-[var(--color-primary-400)] focus:ring-2 focus:ring-[var(--color-primary-100)] transition-all"
        />
        {errors.address && <p className="mt-1.5 text-xs text-red-500">{errors.address.message}</p>}
      </div>

      {/* 日期 & 時段 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-[var(--color-neutral-700)] mb-1.5">
            預約日期 <span className="text-red-500">*</span>
          </label>
          <input
            {...register('booking_date')}
            type="date"
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 rounded-xl border border-[var(--color-neutral-200)] focus:outline-none focus:border-[var(--color-primary-400)] focus:ring-2 focus:ring-[var(--color-primary-100)] transition-all"
          />
          {errors.booking_date && <p className="mt-1.5 text-xs text-red-500">{errors.booking_date.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-neutral-700)] mb-1.5">
            收送時段 <span className="text-red-500">*</span>
          </label>
          <select
            {...register('booking_time')}
            className="w-full px-4 py-3 rounded-xl border border-[var(--color-neutral-200)] focus:outline-none focus:border-[var(--color-primary-400)] focus:ring-2 focus:ring-[var(--color-primary-100)] transition-all bg-white"
          >
            <option value="">請選擇時段</option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
          {errors.booking_time && <p className="mt-1.5 text-xs text-red-500">{errors.booking_time.message}</p>}
        </div>
      </div>

      {/* 服務項目（多選） */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-neutral-700)] mb-3">
          服務項目 <span className="text-red-500">*</span>
          <span className="text-[var(--color-neutral-400)] text-xs ml-2">（可複選）</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {SERVICE_TYPES.map((service) => {
            const checked = selectedServices.includes(service.value);
            return (
              <button
                key={service.value}
                type="button"
                onClick={() => toggleService(service.value)}
                className={`px-3 py-2.5 rounded-xl text-sm font-medium border-2 transition-all duration-150 text-left ${
                  checked
                    ? 'border-[var(--color-primary-500)] bg-[var(--color-primary-50)] text-[var(--color-primary-700)]'
                    : 'border-[var(--color-neutral-200)] text-[var(--color-neutral-600)] hover:border-[var(--color-primary-300)]'
                }`}
              >
                {checked && <span className="mr-1">✓</span>}
                {service.label}
              </button>
            );
          })}
        </div>
        {errors.services && <p className="mt-1.5 text-xs text-red-500">{errors.services.message}</p>}
      </div>

      {/* 備註 */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-neutral-700)] mb-1.5">
          備註 <span className="text-[var(--color-neutral-400)] text-xs">（選填）</span>
        </label>
        <textarea
          {...register('notes')}
          rows={3}
          placeholder="例如：衣物有特殊汙漬、需要急件處理⋯⋯"
          className="w-full px-4 py-3 rounded-xl border border-[var(--color-neutral-200)] focus:outline-none focus:border-[var(--color-primary-400)] focus:ring-2 focus:ring-[var(--color-primary-100)] transition-all resize-none"
        />
      </div>

      {/* 錯誤提示 */}
      {status === 'error' && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>提交失敗，請稍後再試或直接致電預約。</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-4 bg-[var(--color-primary-500)] text-white rounded-xl font-bold text-lg hover:bg-[var(--color-primary-600)] active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-[var(--color-primary-200)]"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            提交中⋯⋯
          </>
        ) : '送出預約申請'}
      </button>

      <p className="text-center text-xs text-[var(--color-neutral-400)]">
        提交後我們將於 24 小時內電話確認，請保持電話暢通
      </p>
    </form>
  );
}
