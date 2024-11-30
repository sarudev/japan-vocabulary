import { bootstrapApplication } from '@angular/platform-browser'
import { appConfig } from './app/app.config'
import { アップコンポーネント } from './app/app.component'

bootstrapApplication(アップコンポーネント, appConfig)
  .catch((err) => console.error(err))
