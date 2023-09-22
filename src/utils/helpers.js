export const validate = (data) => {
  // data objesini object.values ile diziye çevirdik
  // ardından en az bir elemanı null ya da "" şeklinde kontrol ettik
  // en az bir tanesi boş ise false
  // hepsi dolu ise  true dönderir.
  //! some: Bir dizi içinde en az bir elemanın belirli bir koşulu sağlayıp sağlamadığını kontrol eder
  //! every: Bir dizide ki tüm elemanların belirli bir koşulu sağlayıp sağlamadığını kontrol eder.
  const isValid = !Object.values(data).some(
    (i) => i === null || i === "" || i === undefined
  );

  return isValid;
};

// elemanı lokal'e ekleme
export const saveToLocal = (key, value) => {
  // stringe çevirme
  const str = JSON.stringify(value);
  // lokal'e ekleme
  localStorage.setItem(key, str);
};
