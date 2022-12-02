let choose_img_btn = document.querySelector(".choose_image button");
let choose_Input = document.querySelector(".choose_image input");
let view_image_btn = document.querySelector(".view_image img");
let filter_btn = document.querySelectorAll("#icons_room button");
let filter_name = document.querySelector(".filter_info .name");
let slider = document.querySelector(".slider input");
let slider_value = document.querySelector(".filter_info .value");
let rotate_btns = document.querySelectorAll("#icons_room1 button");
let reset = document.querySelector(".reset");
let save = document.querySelector(".save");
let imgWidth = document.getElementById('width');
let imgHeight = document.getElementById('height');
let reduce = document.getElementById('reduce');
let aspect = document.getElementById('aspect');


let imgRatio;
let brightness = 100,
    contrast = 100,
    blur = 0,
    saturate = 100,
    invert = 0,
    rotate = 0,
    flip_x = 1,
    flip_y = 1;
    
    

choose_img_btn.addEventListener("click", ()=> choose_Input.click());
choose_Input.addEventListener("change", () => {
    // console.log(choose_Input.files[0]);
    let file = choose_Input.files[0];
    if (!file) return;
    view_image_btn.src = URL.createObjectURL(file);



        view_image_btn.addEventListener("load", () => {
            document.querySelector(".container").classList.remove("disabled");
            imgWidth.value = view_image_btn.naturalWidth;
            imgHeight.value = view_image_btn.naturalHeight;
            imgRatio = view_image_btn.naturalWidth / view_image_btn.naturalHeight;

            document.querySelector(".h1").remove();
            document.querySelector(".hr").remove();


        });
});
// console.log(filter_name);
imgWidth.addEventListener('keyup', () => {
    let height = aspect.checked ? imgWidth.value / imgRatio : imgHeight.value;
    imgHeight.value = Math.floor(height);
});
imgHeight.addEventListener('keyup', () => {
    let width = aspect.checked ? imgHeight.value * imgRatio : imgWidth.value;
    imgWidth.value = Math.floor(width);
});
    
filter_btn.forEach((element)  => {
    element.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        element.classList.add("active");
        filter_name.innerText = element.id;
        if (element.id === "brightness") { 
            slider.max = "200";
            slider.value = brightness;
            slider_value.innerText = brightness;
        }
        else if (element.id === "contrast") {
            slider.max = "200";
            slider.value = contrast;
            slider_value.innerText = `${contrast}`;
        }
        else if (element.id === "saturate") {
            slider.max = "200";
            slider.value = saturate;
            slider_value.innerText = `${saturate}`;
        }
        else if (element.id === "invert") {
            slider.max = "200";
            slider.value = invert;
            slider_value.innerText = `${invert}`;
        }
        else if (element.id === "blur") {
            slider.max = "200";
            slider.value = blur;
            slider_value.innerText = `${blur}`;
        }
      
    });
});
// console.log(slider_value);

slider.addEventListener("input", () => {
    slider_value.innerText = `${slider.value}%`;
    let sliderState = document.querySelector(".icons_room .active");
    if (sliderState.id === "brightness") {
        brightness = slider.value;
    }
    else if (sliderState.id === "contrast") {
        contrast = slider.value;
    }
    else if (sliderState.id === "saturate") {
        saturate = slider.value;
    }
    else if (sliderState.id === "invert") {
        invert = slider.value;
    }
    else if (sliderState.id === "blur") {
        blur = slider.value/50;
    }
    view_image_btn.style.filter = `brightness(${brightness}%) contrast(${contrast}%)  saturate(${saturate}%) invert(${invert}%) blur(${blur}px)`;
});

rotate_btns.forEach((element)=> {
    element.addEventListener("click", () =>{
        if (element.id === "rotate_left") {
            rotate -= 90;
        }
        else if (element.id === "rotate_right") {
            rotate += 90;
        }
        else if (element.id === "flip_x") {
            flip_x = flip_x === 1 ? -1 : 1;
        }
        else if (element.id === "flip_y") {
            flip_y = flip_y === 1 ? -1 : 1;
        }

        view_image_btn.style.transform = `rotate(${rotate}deg) scale(${flip_x} , ${flip_y})`;
    })
});


// console.log(reset);

reset.addEventListener("click", () => {
    brightness = 100;
    contrast = 100;
    blur = 0;
    saturate = 100;
    invert = 0;
    rotate = 0;
    flip_x = 1;
    flip_y = 1;
    view_image_btn.style.transform = `rotate(${rotate}deg) scale(${flip_x}, ${flip_y})`;
    view_image_btn.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blur}px)`;
    imgWidth.value = view_image_btn.naturalWidth;
    imgHeight.value = view_image_btn.naturalHeight;
  
});
save.addEventListener("click", () => {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = imgWidth.value;
    canvas.height = imgHeight.value;
    // console.log(canvas.width);
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blur}px)`;
    // ctx.translate(canvas.width/2, canvas.height/2);
    ctx.scale(flip_x, flip_y);

    // reduce quality
    let reduce_qual = reduce.checked ? .5 : 1.0;
    ctx.drawImage(view_image_btn, 0, 0, canvas.width, canvas.height);
    const link = document.createElement("a");
    link.download = new Date().getTime();
    link.href = canvas.toDataURL('image/*',reduce_qual);
    link.click();

});