function generateOrderId() {
    return 'ORD-' + Date.now();
  }
  
  // submit form
  function submitForm() {
    const order = document.getElementById('order').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const successMsg = document.getElementById('successMsg');
  
    if (order === '' || phone === '') {
      alert('تکایە هەموو خانەکان پڕ بکە');
      return;
    }
  
    const orderId = generateOrderId();
  
    // ذخیره داواکاری نوێ لە localStorage
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push({
      orderId: orderId,
      order: order,
      phone: phone,
      confirmed: false
    });
    localStorage.setItem('orders', JSON.stringify(orders));
  
    // پیام موفقیت
    successMsg.textContent = '✅ داواکاری تۆ بە سەرکەوتوویی نێردرا';
    successMsg.style.display = 'block';
  
    // نیشاندانی داواکاری نوێ لە status page (بێ refresh)
    if (window.updateStatus) {
      window.updateStatus();
    }
  
    // فڕۆشتنی فۆرم
    document.getElementById('order').value = '';
    document.getElementById('phone').value = '';
  }