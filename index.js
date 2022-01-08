const form = document.querySelector("#newsForm")
const list = document.querySelector("#list");


const getElement = (elementName, attrs = {}, father) => {
    const element = document.createElement(elementName);

    for (const attrsKey in attrs) {
        element[attrsKey] = attrs[attrsKey];
    }

    father && father.append(element);

    return element;
}

var word;

list.addEventListener("click", async (e) => {
    if (e.target.tagName === 'P'){
        word = e.target.textContent;
        document.querySelector("#loading").classList.remove("d-none");
        try {
            const res = await getNews(word);
            render(res.data)
        } catch {
            console.log("error")
        }
    }

})
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    word = form.news.value.trim();
    document.querySelector("#loading").classList.remove("d-none");
    if (word === "") return;

    try {
        const res = await getNews(word);
        console.log(res.data)
        render(res.data)
    } catch {
        console.log("error")
    }

})

const newsPlace = document.querySelector("#newsPlace")
getElement("h3", {className: " display-6", innerHTML: "all news",}, newsPlace)
const set = async () => {
    try {
        const res = await getNews1();
        res.data.data.map((data) => {
            const col = getElement("div", {className: "col-12  col-md-6 col-lg-4 my-3"}, newsPlace)
            const card = getElement("div", {className: "card border-0 overflow-hidden shadow h-100"}, col);
            const cardHeader = getElement("div", {className: "card-header p-0 w-100 h-100"}, card)
            console.log(data)
            const IMG = getElement("img", {className: " w-100 h-100", src: data.imageUrl}, cardHeader)
            const cardBody = getElement("div", {className: "card-body"}, card)
            const dateT = getElement("p", {className: " text-secondary m-0", innerHTML: data.date}, cardBody)
            const dateH = getElement("p", {className: " text-secondary mt-0", innerHTML: data.time}, cardBody)
            const auth = getElement("h6", {className: "", innerHTML: `Author: ${data.author}`}, cardBody)
            const title = getElement("p", {
                className: "",
                innerHTML: `<span class="fw-bold">About :</span> ${data.title}`
            }, cardBody)
            const Dflex = getElement("div", {className: "d-flex justify-content-between"}, cardBody)
            const left = getElement("div", {className: "",}, Dflex)
            getElement("a", {className: "", innerHTML: "read more", href: data.readMoreUrl}, left)

        })

    } catch {
        console.log("error")
    }
    document.querySelector("#loading").classList.add("d-none");
}
set()


const render = (data) => {
    newsPlace.innerHTML = ""
    getElement("h3", {className: "display-6", innerHTML: ` ${word} news`,}, newsPlace)
    data.data.map((data) => {
        const col = getElement("div", {className: "col-12 col-md-6 col-lg-4 my-2"}, newsPlace)
        const card = getElement("div", {className: "card h-100"}, col);
        const cardHeader = getElement("div", {className: "card-header p-0 w-100 h-100"}, card)
        console.log(data)
        const IMG = getElement("img", {className: " w-100 h-100", src: data.imageUrl}, cardHeader)
        const cardBody = getElement("div", {className: "card-body"}, card)
        const dateT = getElement("p", {className: " text-secondary m-0", innerHTML: data.date}, cardBody)
        const dateH = getElement("p", {className: " text-secondary mt-0", innerHTML: data.time}, cardBody)
        const auth = getElement("h6", {className: "", innerHTML: `Author: ${data.author}`}, cardBody)
        const title = getElement("p", {
            className: "",
            innerHTML: `<span class="fw-bold">About :</span> ${data.title}`
        }, cardBody)
        const Dflex = getElement("div", {className: "d-flex justify-content-between"}, cardBody)
        const left = getElement("div", {className: "",}, Dflex)
        getElement("a", {className: "", innerHTML: "read more", href: data.readMoreUrl}, left)

    })
    document.querySelector("#loading").classList.add("d-none");

}


