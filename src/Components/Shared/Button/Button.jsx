import { Button as ShadcnButton } from '@/components/ui/button'

const Button = ({ label, onClick, disabled, outline, small, icon: Icon, className, ...props }) => {
    return (
        <ShadcnButton
            disabled={disabled}
            onClick={onClick}
            variant={outline ? 'outline' : 'default'}
            size={small ? 'sm' : 'default'}
            className={`w-full cursor-pointer ${small ? '' : 'py-3'} ${className || ''}`}
            {...props}
        >
            {Icon && <Icon size={small ? 14 : 24} />}
            {label}
        </ShadcnButton>
    )
}

export default Button