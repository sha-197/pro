let connected = false;

function toggleStatus() {
  const sw = document.querySelector('.switch');
  const knob = document.querySelector('.knob');
  const radar = document.getElementById('radar');
  const offlineBox = document.getElementById('offlineBox');
  const leftText = document.getElementById('leftText');
  const rightText = document.getElementById('rightText');

  connected = !connected;

  if (connected) {
    sw.classList.remove('off');
    knob.textContent = '✓';

    radar.style.display = 'block';
    radar.classList.add('animate');
    offlineBox.style.display = 'none';

    leftText.classList.add('active');
    rightText.classList.remove('active');
  } else {
    sw.classList.add('off');
    knob.textContent = '✕';

    radar.style.display = 'none';
    radar.classList.remove('animate');
    offlineBox.style.display = 'block';

    rightText.classList.add('active');
    leftText.classList.remove('active');
  }
}

window.onload = function () {
    const order = localStorage.getItem('order');
    const orderText = document.getElementById('orderText');
  
    if (order) {
      orderText.textContent = order;
    } else {
      orderText.textContent = 'هیچ داواکارییەک نییە';
    }
  };

  window.onload = function () {
    const order = localStorage.getItem('order');
    const phone = localStorage.getItem('phone');
    const orderId = localStorage.getItem('orderId');
  
    document.getElementById('orderText').textContent =
      order ? order : 'هیچ داواکارییەک نییە';
  
    document.getElementById('phoneText').textContent =
      phone ? phone : 'هیچ ژمارەیەک نییە';
  
    document.getElementById('orderIdText').textContent =
      orderId ? orderId : '---';
  
    if (localStorage.getItem('confirmed') === 'yes') {
      document.getElementById('confirmMsg').textContent = '✅ داواکاری پشتڕاستکراوە';
      document.getElementById('confirmMsg').style.display = 'block';
      document.querySelector('.confirm-btn').disabled = true;
      document.querySelector('.clear-btn').disabled = true;
    }
  };
  
  function clearOrder() {
    localStorage.removeItem('order');
    localStorage.removeItem('phone');
  
    document.getElementById('orderText').textContent = 'سڕایەوە';
    document.getElementById('phoneText').textContent = 'سڕایەوە';
  }

  function confirmOrder() {
    const order = localStorage.getItem('order');
    const phone = localStorage.getItem('phone');
    const msg = document.getElementById('confirmMsg');
  
    if (!order || !phone) {
      alert('هیچ داواکارییەک نییە بۆ پشتڕاستکردنەوە');
      return;
    }
  
    // نیشانەی پشتڕاستکردن
    localStorage.setItem('confirmed', 'yes');
  
    msg.textContent = '✅ داواکاری پشتڕاستکرا';
    msg.style.display = 'block';
  
    // داخستنی دوگمەکان
    document.querySelector('.confirm-btn').disabled = true;
    document.querySelector('.clear-btn').disabled = true;
  }


  function updateStatus() {
    const container = document.getElementById('ordersContainer');
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
  
    container.innerHTML = ''; // پاککردن قبل از نیشاندانی نوێ
  
    orders.forEach((o, index) => {
      const div = document.createElement('div');
      div.classList.add('order-box');
  
      div.innerHTML = `
        <h3>Order ID: ${o.orderId}</h3>
        <p>داواکاری: ${o.order}</p>
        <p>ژمارە: ${o.phone}</p>
        <p>وضعیت: <span class="status-text">${o.confirmed ? '✅ پشتڕاستکراو' : '❌ پشتڕاست نەکراو'}</span></p>
        ${!o.confirmed ? `<button onclick="confirmOrder(${index})">پشتڕاستکردنەوە</button>` : ''}
      `;
      container.appendChild(div);
    });
  }
  
  // confirm function
  function confirmOrder(index) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders[index].confirmed = true;
    localStorage.setItem('orders', JSON.stringify(orders));
    updateStatus(); // نیشاندانی نوێ هەموو کات
  }
  
  // load page
  window.onload = function () {
    window.updateStatus = updateStatus;
    updateStatus();
  };

  function updateStatus() {
    const container = document.getElementById('ordersContainer');
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
  
    container.innerHTML = ''; // پاککردن قبل از نیشاندانی نوێ
  
    orders.forEach((o, index) => {
      const div = document.createElement('div');
      div.classList.add('order-box');
  
      div.innerHTML = `
        <h3>Order ID: ${o.orderId}</h3>
        <p>داواکاری: ${o.order}</p>
        <p>ژمارە: ${o.phone}</p>
        <p>وضعیت: <span class="status-text">${o.confirmed ? '✅ پشتڕاستکراو' : '❌ پشتڕاست نەکراو'}</span></p>
        ${!o.confirmed ? `<button class="confirm-btn" onclick="confirmOrder(${index})">پشتڕاستکردنەوە</button>` : ''}
        ${o.confirmed ? `<button class="clear-btn" onclick="clearOrder(${index})">سڕینەوە</button>` : ''}
      `;
      container.appendChild(div);
    });
  }
  
  // پشتڕاستکردن
  function confirmOrder(index) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders[index].confirmed = true;
    localStorage.setItem('orders', JSON.stringify(orders));
    updateStatus(); // نیشاندانی نوێ هەموو کات
  }
  
  // سڕینەوە
  function clearOrder(index) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.splice(index, 1); // سڕینەوە لە array
    localStorage.setItem('orders', JSON.stringify(orders));
    updateStatus(); // نیشاندانی نوێ
  }
  
  // load page
  window.onload = function () {
    window.updateStatus = updateStatus;
    updateStatus();
  };