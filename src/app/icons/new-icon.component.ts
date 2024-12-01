import { Component } from '@angular/core'

@Component({
  selector: 'new-icon',
  imports: [],
  template: `
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
    </g>
    <g id="SVGRepo_iconCarrier">
      <path
        d="M4 12H20M12 4V20"
        stroke="#fff"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
    </path>
    </g>
  </svg>
  `
})
export class NewIconComponent {}
