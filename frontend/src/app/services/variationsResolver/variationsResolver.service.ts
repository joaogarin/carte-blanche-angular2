import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
@Injectable()
export class VariationsResolverService {
    // Observable string sources
    private variationUpdatedSource = new Subject<string>();
    // Observable string streams
    variationUpdated$ = this.variationUpdatedSource.asObservable();
    // Service message commands
    updateVariationInput(name: string, value: any) {
        this.variationUpdatedSource.next(JSON.stringify({
            name: name,
            value: value,
        }));
    }
}
