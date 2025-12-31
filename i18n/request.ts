import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;
 
  if (!locale || !['en', 'fr'].includes(locale)) {
    locale = 'en';
  }
 
  return {
    locale,
    // تغییر مهم: ../ بجای ../../ (چون src نداریم)
    messages: (await import(`../messages/${locale}.json`)).default
  };
});