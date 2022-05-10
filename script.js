const d = document;

const cars = JSON.parse(localStorage.getItem("cars-list")) || [];

// buttons
d.getElementById("add").addEventListener("click", () =>
  d.getElementById("form-add").classList.remove("hidden")
);
d.getElementById("close-add").addEventListener("click", () =>
  d.getElementById("form-add").classList.add("hidden")
);

d.getElementById("close-edit").addEventListener("click", () =>
  d.getElementById("form-edit").classList.add("hidden")
);

const showCars = () => {
  const $listCar = document.getElementById("list-car");
  let html = "";
  cars.forEach((car) => {
    html += `<div class="max-w-md mx-auto mb-5 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div class="md:flex">
          <div class="md:flex-shrink-0 relative">
            <img class="h-52 min-h-full w-full object-cover md:w-48" src="${car.image}" alt="Man looking at item at a store">
            <div class="absolute rounded bg-white px-3 py-2 bottom-3 right-3">${car.colour}</div>
          </div>
          <div class="p-6">
            <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">${car.brand}</div>
            <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">${car.model}</a>
            <p class="mt-2 text-gray-500">${car.description}</p>
            <div class="flex items-center">
                <div class="flex-shrink-0 text-left mt-2 font-medium">
                    <p class="text-cyan-600 text-md">${car.year}</p>
                    <p class="text-gray-500 font-normal">${car.price}</p>
                  </div>
                <div class="flex-auto text-right mt-2">
                    <a href="#" class="edit">
                    <button title="Edit" onclick="updateCar(${car.ID})" class="text-gray-800 mr-3 inline-flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </button>
                </a>
                  <button title="Remove" onclick="deleteCar(${car.ID})" class="block text-gray-800 inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                  </button>
                </div>
            </div>
          </div>
        </div>
      </div>`;
  });
  $listCar.innerHTML = html;
};

const deleteCar = (id) => {
  const index = cars.findIndex((car) => car.ID == id);
  cars.splice(index, 1);

  showCars();
};

const addCar = () => {
  const brand = d.getElementById("brand").value;
  const model = d.getElementById("model").value;
  const colour = d.getElementById("colour").value;
  const description = d.getElementById("description").value;
  const year = d.getElementById("year").value;
  const price = d.getElementById("price").value;
  const image = d.getElementById("image").value;

  let ID = 1;
  if (cars.length > 0) {
    ID = cars[cars.length - 1].ID + 1;
  }

  const newCar = {
    brand,
    model,
    colour,
    description,
    year,
    price,
    image,
    ID
  };
  cars.push(newCar);
  showCars();

  localStorage.setItem("cars-list", JSON.stringify(cars));

  d.querySelector("#form-add form").reset();
  d.getElementById("form-add").classList.add("hidden");
};

let updateId = -1;
const updateCar = (id) => {
  updateId = id;
  const car = cars.find((car) => car.ID === id);

  d.getElementById("form-edit").classList.remove("hidden");

  d.querySelector("#form-edit #brand").value = car.brand;
  d.querySelector("#form-edit #model").value = car.model;
  d.querySelector("#form-edit #colour").value = car.colour;
  d.querySelector("#form-edit #description").value = car.description;
  d.querySelector("#form-edit #year").value = car.year;
  d.querySelector("#form-edit #price").value = car.price;
  d.querySelector("#form-edit #image").value = car.image;
};

const saveEdit = () => {
  const car = cars.find((car) => car.ID === updateId);

  const brand = d.querySelector("#form-edit #brand").value;
  const model = d.querySelector("#form-edit #model").value;
  const colour = d.querySelector("#form-edit #colour").value;
  const description = d.querySelector("#form-edit #description").value;
  const year = d.querySelector("#form-edit #year").value;
  const price = d.querySelector("#form-edit #price").value;
  const image = d.querySelector("#form-edit #image").value;

  car.brand = brand;
  car.model = model;
  car.colour = colour;
  car.description = description;
  car.year = year;
  car.price = price;
  car.image = image;

  showCars();
  
  localStorage.setItem("cars-list", JSON.stringify(cars));

  d.querySelector("#form-edit form").reset();
  d.getElementById("form-edit").classList.add("hidden");
};

showCars();