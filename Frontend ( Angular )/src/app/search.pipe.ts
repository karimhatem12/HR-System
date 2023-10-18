import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search'
})
export class SearchPipe implements PipeTransform {

    transform(list: any[], searchTerm: string): any[] {
        return list.filter((i) => i.first_name.toLowerCase().includes(searchTerm.toLowerCase()) | i.last_name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

}
