const baseURL = ""; //'http://localhost:3000
window.onscroll = () => {
  if (window.scrollY > 60) {
    document.querySelector("#scroll-top").classList.add("active");
  } else {
    document.querySelector("#scroll-top").classList.remove("active");
  }
};

function loader() {
  document.querySelector(".loader-container").classList.add("fade-out");
}

function fadeOut() {
  setInterval(loader, 500);
}
window.onload = fadeOut();

/*  Cart   */
const newCart = (newCartValue) => {
  const cartRow2 = newCartValue.map(
    (el) =>
      (el = ` <div class="cart-row">
                            <div class="cart-item cart-column">
                                <img class="cart-item-image" src="<%= product.info.images[0].url %>" alt="<%= product.name %>" width="100" height="100">
                                <span class="cart-item-title">${el.id} </span>
                            </div>
                            <span class="cart-price cart-column"><%= new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.info.price)%> </span>
                            <div class="cart-quantity cart-column">
                                <input class="cart-quantity-input" type="number" id="<%= product.id %>" value="<%= product.qty %>" onchange="changeQtyItems(this)" >
                            </div>
                            <span class="cart-price cart-column">${el.value} </span>
                            <button class="btn btn-danger" type="button" onclick="deleteItems('<%= product.id %>')">Xóa</button>
                        </div>`)
  );
  console.log(cartRow2);
  return `  <div id="cart">
        <div id="myModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Giỏ Hàng</h5>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="cart-row">
                        <span class="cart-item cart-header cart-column">Sản Phẩm</span>
                        <span class="cart-price cart-header cart-column">Giá</span>
                        <span class="cart-quantity cart-header cart-column">Số Lượng</span>
                        <span class="cart-price cart-header cart-column">Tổng Giá</span>
                        <span class="cart-price cart-header cart-column">Xóa</span>
                    </div>
                    <div class="cart-items">
                       
                                <div class="cart-row">
                                    <div class="cart-item cart-column">
                                        <img class="cart-item-image" src="../../public/img/g-6.jpg" alt="demo" width="100" height="100">
                                        <span class="cart-item-title">demo</span>
                                    </div>
                                    <span class="cart-price cart-column">1000d</span>
                                    <div class="cart-quantity cart-column">
                                        <!-- <input class="cart-quantity-input" type="number" id="demo" value="demo" onchange="changeQtyItems(this)" > -->
                                         <input class="cart-quantity-input" type="number" id="demo" value="1" onchange="changeQtyItems(this)" >
                                    </div>
                                    <span class="cart-price cart-column">100000 </span>
                                    <!-- <button class="btn btn-danger " onclick="deleteItems('<%= product.id %>')" type="button">Xóa</button> -->
                                     <button class="btn btn-danger " onclick="" type="button">Xóa</button>
                                </div>
                           
                            <div class="cart-total">
                                <!-- <strong class="cart-total-title">Tổng Cộng:</strong>
                                <span class="cart-total-price"><%= new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cart.totalPrice) %> </span><br>
                                <strong class="cart-total-title">Tổng số lượng:</strong>
                                <span class="cart-total-price"><%= cart.totalQuantity %> </span> -->
                                <strong class="cart-total-title">Tổng Cộng:</strong>
                                <span class="cart-total-price">10 </span><br>
                                <strong class="cart-total-title">Tổng số lượng:</strong>
                                <span class="cart-total-price">10</span>
                            </div>
                      
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn close-footer">Đóng</button>
                    <a href="/checkout"><button type="button" class="btn order">Đặt Hàng</button></a>
                </div>
            </div>
        </div>`;
};
function popup() {
  var modal = document.querySelector("#myModal");
  var cartBtn = document.getElementById("cart-btn");
  var close = document.getElementsByClassName("close")[0];
  var close_footer = document.getElementsByClassName("close-footer")[0];
  var order = document.getElementsByClassName("order")[0];
  cartBtn.onclick = function () {
    modal.style.display = "block";
  };
  close.onclick = function () {
    modal.style.display = "none";
  };
  close_footer.onclick = function () {
    modal.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}
function showCart() {
  var modal = document.querySelector("#myModal");
  modal.style.display = "block";
}
popup();
let Cart = document.querySelector("#cart");
async function addCart(id) {
  try {
    const idProduct = id;
    const response = await axios({
      method: "GET",
      url: `${baseURL}/api/product/addCart/` + idProduct,
    });
    Cart.innerHTML = "";
    Cart.innerHTML = response.data;
    showCart();
    popup();
  } catch (error) {
    console.log(error);
  }
}
async function deleteItems(id) {
  try {
    // const idProduct = id;
    // const response  = await axios({
    //   method: "GET",
    //   url: `${baseURL}/api/product/deleteItem/`+idProduct,
    // })
    Cart.innerHTML = "";
    Cart.innerHTML = newCart();
    showCart();
    popup();
  } catch (error) {
    console.log(error);
  }
}
async function changeQtyItems(el) {
  try {
    // const response  = await axios({
    //   method: "GET",
    //   url: `${baseURL}/api/product/editQtyItem/${el.id}/qty/${el.value}`,
    // })
    // Cart.innerHTML = "";
    // Cart.innerHTML = 1;
    Cart.innerHTML = "";

    const localCart = JSON.parse(localStorage.getItem("cart"));

    if (localCart === null) {
      localStorage.setItem(
        "cart",
        JSON.stringify([{ id: el.id, value: el.value }])
      );
    } else {
      const newCart = [...localCart, { id: el.id, value: el.value }];
      localStorage.setItem(
        "cart",
        JSON.stringify([...localCart, { id: el.id, value: el.value }])
      );
    }
    console.log(JSON.parse(localStorage.getItem("cart")));
    Cart.innerHTML = newCart(localCart);
    showCart();
    popup();
  } catch (error) {
    console.log(error);
  }
}
//LOG OUT USER
const btnLogout = document.querySelector(".btn-logout");
const logout = async function () {
  try {
    const res = await axios({
      method: "GET",
      url: `${baseURL}/api/user/logout`,
    });
    if (res.data.status === "success") {
      location.assign("/home");
    }
  } catch (err) {
    alert("Try Again");
  }
};
if (btnLogout) {
  btnLogout.addEventListener("click", function (e) {
    e.preventDefault();
    logout();
  });
}
function menuToggle() {
  const toggleMenu = document.querySelector(".list");
  toggleMenu.classList.toggle("active");
}

//rate - us
const sliderHome = document.querySelector(".sliderHome");
const nextBtnHome = document.querySelector(".next-btnHome");
const prevBtnHome = document.querySelector(".prev-btnHome");
const slidesHome = document.querySelectorAll(".slideHome");
const slideIconsHome = document.querySelectorAll(".slide-iconHome");
const numberOfSlidesHome = 5;
var slideNumber = 0;
nextBtnHome.addEventListener("click", () => {
  slidesHome.forEach((slide) => {
    slide.classList.remove("active");
  });
  slideIconsHome.forEach((slideIcon) => {
    slideIcon.classList.remove("active");
  });
  slideNumber++;

  if (slideNumber > 4) {
    slideNumber = 0;
  }
  slidesHome[slideNumber].classList.add("active");
  slideIconsHome[slideNumber].classList.add("active");
});
prevBtnHome.addEventListener("click", () => {
  slidesHome.forEach((slide) => {
    slide.classList.remove("active");
  });
  slideIconsHome.forEach((slideIcon) => {
    slideIcon.classList.remove("active");
  });
  slideNumber--;

  if (slideNumber < 0) {
    slideNumber = 4;
  }
  slidesHome[slideNumber].classList.add("active");
  slideIconsHome[slideNumber].classList.add("active");
});
//auto slide
var playSlide;
var repeater = () => {
  playSlide = setInterval(function () {
    slidesHome.forEach((slide) => {
      slide.classList.remove("active");
    });
    slideIconsHome.forEach((slideIcon) => {
      slideIcon.classList.remove("active");
    });
    slideNumber++;

    if (slideNumber > 4) {
      slideNumber = 0;
    }
    slidesHome[slideNumber].classList.add("active");
    slideIconsHome[slideNumber].classList.add("active");
  }, 4000);
};
repeater();
// Smooth scroll
const scrollTo = document.querySelectorAll(".scroll");
scrollTo.forEach((el) =>
  el.addEventListener("click", function (e) {
    e.preventDefault();
    const section = document.querySelector(`#${e.target.dataset.section}`);
    section.scrollIntoView({ behavior: "smooth" });
  })
);
