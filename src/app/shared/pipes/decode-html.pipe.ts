import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'decodeHtml'
})
export class DecodeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): string {
    if (!value) return '';
    const doc = new DOMParser().parseFromString(value, 'text/html');
    return doc.documentElement.textContent || '';
  }

}
