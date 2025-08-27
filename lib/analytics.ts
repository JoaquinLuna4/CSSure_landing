// Send events to Google Analytics
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  } else {
    console.log('GA Event:', { action, category, label, value });
  }
};

// Track form submission
export const trackFormSubmission = (formId: string, email: string) => {
  trackEvent('form_submit', 'engagement', formId, 1);
  trackEvent('email_submission', 'engagement', email, 1);
};

// Track button click
export const trackButtonClick = (buttonName: string) => {
  trackEvent('button_click', 'ui_interaction', buttonName, 1);
};
