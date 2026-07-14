import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

type BaseProps = {
  id: string
  label: string
  error?: string
}

type InputProps = BaseProps &
  InputHTMLAttributes<HTMLInputElement> & {
    multiline?: false
  }

type TextareaProps = BaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    multiline: true
  }

type FloatingFieldProps = InputProps | TextareaProps

const fieldClassName =
  'peer w-full rounded-xl border border-white/10 bg-black/30 px-4 pb-2.5 pt-6 text-sm text-foreground outline-none transition-colors placeholder-transparent focus:border-accent-purple/50'

const labelClassName =
  'pointer-events-none absolute left-4 top-4 origin-left text-sm text-muted transition-[transform,color] duration-200 peer-focus:-translate-y-2.5 peer-focus:scale-75 peer-focus:text-accent-purple peer-[:not(:placeholder-shown)]:-translate-y-2.5 peer-[:not(:placeholder-shown)]:scale-75'

export default function FloatingField(props: FloatingFieldProps) {
  const { id, label, error, multiline, ...rest } = props
  const describedBy = error ? `${id}-error` : undefined

  return (
    <div>
      <div className="relative">
        {multiline ? (
          <textarea
            id={id}
            placeholder=" "
            rows={5}
            className={`${fieldClassName} resize-none`}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={describedBy}
            {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            id={id}
            placeholder=" "
            className={fieldClassName}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={describedBy}
            {...(rest as InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
        <label htmlFor={id} className={labelClassName}>
          {label}
        </label>
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-accent-rose">
          {error}
        </p>
      ) : null}
    </div>
  )
}
