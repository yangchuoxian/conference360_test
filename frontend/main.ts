import { bootstrap }    from '@angular/platform-browser-dynamic'
import { enableProdMode, provide } from '@angular/core'
import { HTTP_PROVIDERS } from '@angular/http';

import { environment } from './config/environment'
// Custom components
import { AppComponent } from './components/app.component'
// Custom services
import { StateService } from './services/state.service'

if (environment == 'production') {
	enableProdMode()
}

bootstrap(AppComponent, [
	HTTP_PROVIDERS,
	StateService
])