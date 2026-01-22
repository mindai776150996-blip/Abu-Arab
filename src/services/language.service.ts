import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  language = signal<'ar' | 'en'>('ar');

  private translations: any = {
    ar: {
      navHome: 'الرئيسية',
      navProducts: 'منتجاتنا',
      navGallery: 'المعرض',
      logoText: 'أبو عرب',
      heroTitleLine1: 'مؤسسة أبو عرب',
      heroTitleLine2: 'للتجارة والإستيراد',
      heroSubtitle: 'التميز في عالم السيراميك والرخام والبورسلان',
      productsTitle: 'منتجاتنا المميزة',
      viewAllProducts: 'عرض كل المنتجات',
      whatsappChannelTitle: 'تابع قناة WhatsApp',
      whatsappChannelDesc: 'كن أول من يعرف عن المنتجات الجديدة والعروض الحصرية',
      whatsappChannelButton: 'تابع القناة',
      whatsappCatalogTitle: 'تصفح كتالوج WhatsApp',
      whatsappCatalogDesc: 'شاهد المزيد من المنتجات على كتالوج واتساب',
      whatsappCatalogButton: 'عرض الكتالوج',
      footerContact: 'مؤسسة أبو عرب للتجارة والإستيراد',
      footerLocationTitle: 'موقعنا',
      footerLocationAddress: 'شبـوة - عتـق - بجانب مجمع العاصمة',
      footerRights: 'جميع الحقوق محفوظة.',
      langToggle: 'EN',
      galleryTitle: 'تصفح معرضنا',
      gallerySearchPlaceholder: 'أبحث بالاسم أو بالوصف..',
      galleryBackButton: 'العودة للصفحة الرئيسية',
      loginTitle: 'تسجيل الدخول',
      loginUser: 'اسم المستخدم',
      loginPass: 'كلمة المرور',
      loginButton: 'دخول',
      loginBack: 'العودة للصفحة الرئيسية',
    },
    en: {
      navHome: 'Home',
      navProducts: 'Products',
      navGallery: 'Gallery',
      logoText: 'Abu Arab',
      heroTitleLine1: 'Abu Arab Foundation',
      heroTitleLine2: 'for Trade & Import',
      heroSubtitle: 'Excellence in the World of Ceramics, Marble, and Porcelain',
      productsTitle: 'Our Featured Products',
      viewAllProducts: 'View All Products',
      whatsappChannelTitle: 'Follow WhatsApp Channel',
      whatsappChannelDesc: 'Be the first to know about new products and exclusive offers',
      whatsappChannelButton: 'Follow Channel',
      whatsappCatalogTitle: 'Browse WhatsApp Catalog',
      whatsappCatalogDesc: 'See more products in our WhatsApp catalog',
      whatsappCatalogButton: 'View Catalog',
      footerContact: 'Abu Arab Foundation for Trade & Import',
      footerLocationTitle: 'Our Location',
      footerLocationAddress: 'Shabwa - Ataq - Next to the Capital Complex',
      footerRights: 'All Rights Reserved.',
      langToggle: 'ع',
      galleryTitle: 'Browse Our Gallery',
      gallerySearchPlaceholder: 'Search by name or description...',
      galleryBackButton: 'Back to Homepage',
      loginTitle: 'Login',
      loginUser: 'Username',
      loginPass: 'Password',
      loginButton: 'Sign In',
      loginBack: 'Back to Homepage',
    },
  };

  current = computed(() => this.translations[this.language()]);

  toggleLanguage() {
    this.language.update(current => (current === 'ar' ? 'en' : 'ar'));
  }
}