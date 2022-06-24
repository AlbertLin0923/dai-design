import type { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import React from 'react';
import classNames from 'classnames';

export type ButtonSize = 'lg' | 'sm';
export type ButtonType = 'primary' | 'default' | 'danger' | 'link';

export type ButtonHTMLType = 'submit' | 'button' | 'reset';

interface BaseButtonProps {
  className?: string;
  /**设置 Button 的禁用 */
  disabled?: boolean;
  /**设置 Button 的尺寸 */
  size?: ButtonSize;
  /**设置 Button 的类型 */
  type?: ButtonType;
  children: React.ReactNode;
  href?: string;
}
// type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>

export type NativeButtonProps = {
  htmlType?: ButtonHTMLType;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps &
  Omit<ButtonHTMLAttributes<HTMLElement>, 'type' | 'onClick'>;


type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;


export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互
 * ### 引用方法
 *
 * ~~~js
 * import { Button } from 'vikingship'
 * ~~~
 */
export const Button: FC<ButtonProps> = props => {
  const {
    type,
    className,
    disabled,
    size,
    children,
    href,
    ...restProps
  } = props;
  // btn, btn-lg, btn-primary
  const classes = classNames('adai-btn', className, {
    [`adai-btn-${type}`]: type,
    [`adai-btn-${size}`]: size,
    disabled: type === 'link' && disabled,
  });
  if (type === 'link') {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    );
  }
};

Button.defaultProps = {
  disabled: false,
  type: 'default',
};

export default Button;
