import { animate, style, transition, trigger } from '@angular/animations'

export const numberEnterSlideUp = trigger('numberEnterSlideUp', [
  transition(':leave', [
    animate(
      '400ms 400ms ease-in',
      style({ transform: 'translateY(-150%)' })
    )
  ])
])

export const numberEnterSlideDown = trigger('numberEnterSlideDown', [
  transition(':enter', [
    style({ transform: 'translateY(150%)' }),
    animate(
      '400ms 400ms ease-out',
      style({ transform: 'translateY(0)' })
    )
  ])
])

export const pressEnterLeaveSlide = trigger('pressEnterLeaveSlide', [
  transition(':enter', [
    style({ transform: 'translateY(100%)', opacity: 0 }),
    animate(
      '500ms 1s ease-out',
      style({ transform: 'translateY(0)', opacity: 0.5 })
    )
  ]),
  transition(':leave', [
    style({ transform: 'translateY(0)', opacity: 0.5 }),
    animate(
      '100ms ease-out',
      style({ transform: 'translateY(100%)', opacity: 0 })
    )
  ])
])

export const containerTranslationEnterSlideDown = trigger('containerTranslationEnterSlideDown', [
  transition(':enter', [
    style({ transform: 'translateY(-25%)', opacity: 0 }),
    animate(
      '200ms ease-out',
      style({ transform: 'translateY(0)', opacity: 1 })
    )
  ])
])

export const containerLeaveSlideDown = trigger('containerLeaveSlideDown', [
  transition(':leave', [
    style({ transform: 'translateY(0)', opacity: 1 }),
    animate(
      '200ms ease-out',
      style({ transform: 'translateY(25%)', opacity: 0 })
    )
  ])
])

export const submitEnterLeaveSlide = trigger('submitEnterLeaveSlide', [
  transition(':enter', [
    style({ transform: 'translateX(50%)', scale: 0, opacity: 0 }),
    animate(
      '400ms ease',
      style({ transform: 'translateX(0)', scale: 1, opacity: 1 })
    )
  ]),
  transition(':leave', [
    style({ transform: 'translateX(0)', scale: 1, opacity: 1 }),
    animate(
      '400ms ease',
      style({ transform: 'translateX(50%)', scale: 0, opacity: 0 })
    )
  ])
])
