import React from 'react';
import { useTranslation } from 'react-i18next';

const PaymentPage = () => {
  const { t, i18n } = useTranslation();
  const isVietnamese = i18n.language === 'vi';

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <main className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-5xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-2xl">
        <div className="mb-5">
          {t('paymentPage.instruction')}
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 flex flex-col p-4 border border-gray-200 rounded-xl">
            <div className="mb-4 text-gray-600">
              <p className="font-semibold">{t('paymentPage.step1')}</p>
              <p>{t('paymentPage.step2')} <i className="fa-solid fa-qrcode"></i> {t('paymentPage.step2Icon')}</p>
            </div>
            <div className="relative p-2 border-2 border-dashed border-gray-300 rounded-lg">
              <img id="qr-image" src="/assets/imgs/qrcodetp.png" alt="Payment QR Code" className="w-64 h-64 m-auto object-cover" />
            </div>
            <a id="download-qr-btn" href="/assets/imgs/qrcodetp.png" download="Payment-QR.png" className="mt-6 inline-flex items-center justify-center w-fit m-auto bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition-all duration-300 shadow-md">
              <i className="fa-solid fa-download mr-2"></i>
              <span>{t('paymentPage.downloadQR')}</span>
            </a>
            <div className="mt-4 text-gray-600">
              <p>{t('paymentPage.step3')}</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col">
            <h2 className="text-2xl font-bold text-brand-navy mb-1">{t('paymentPage.transferDetails')}</h2>
            <p className="text-gray-500 mb-6">{t('paymentPage.supportText')}</p>
            <div className="text-center bg-gray-100 py-3 rounded-lg mb-6">
              <p className="text-2xl font-extrabold text-brand-navy-light tracking-wider">{t('paymentPage.accountName')}</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 font-medium w-1/2">{t('paymentPage.bank')}</span>
                <div className="flex items-center gap-3 w-1/2">
                  <span className="font-semibold"><img src="https://tpb.vn/wps/wcm/connect/a85b875d-ad73-4591-8fd5-e8417a69c316/logo-tpb.png?MOD=AJPERES&CACHEID=ROOTWORKSPACE-a85b875d-ad73-4591-8fd5-e8417a69c316-pjudclH" className="h-6" alt="TPBank" /></span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 font-medium w-1/2">{t('paymentPage.accountNumber')}</span>
                <div className="flex items-center gap-3 w-1/2">
                  <span id="account-number" className="font-bold text-brand-teal">87968879879</span>
                  <button onClick={() => copyToClipboard('87968879879')} className="text-gray-400 hover:text-brand-teal transition" title="Copy">
                    <i className="fa-regular fa-copy"></i>
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 font-medium w-1/2">{t('paymentPage.amount')}</span>
                <div className="flex items-center gap-3 w-1/2">
                  <span id="amount" className="font-bold text-red-600">{isVietnamese ? '2.000.000 VND' : '76 USD'}</span>
                  <button onClick={() => copyToClipboard(isVietnamese ? '2000000' : '76')} className="text-gray-400 hover:text-brand-teal transition" title="Copy">
                    <i className="fa-regular fa-copy"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-auto pt-6 text-red-600 font-semibold text-center border-t border-dashed mt-6">
              <p>{t('paymentPage.finalNote')} <span className="font-extrabold">{t('paymentPage.finalNoteBold')}</span>{t('paymentPage.finalNoteEnd')}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PaymentPage;