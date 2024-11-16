var globalProductList;
let filtersSeperated = [];
selectedFilters = []
var currentFilterIds = []
var currentSearchQuery = ""
var currentSearchResult = []
var searcheHistory = []

clearFilterBtn = document.querySelector(".ft-clear")
clearFilterBtn.addEventListener('click', () => {
    location.reload();
})
clearFilterBtn.style.display = 'none';

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.img-container').addEventListener('click',()=>{
        location.reload()
    })

    fetch('/scripts/filters.json')
        .then(response => response.json())
        .then(data => {
            filtersSeperated = data;


            allSfOpts = document.querySelectorAll('.sf-option');
            allBfOpts = document.querySelectorAll('.bf-option');

            allFilterOpts = [...allSfOpts, ...allBfOpts]

            //set toggle state for each filter option
            allFilterOpts.forEach(eachFilteropt => {
                eachFilteropt.setAttribute("toggle", "0");
            })

            //setting ids for all options

            allSfOpts.forEach(sfOpt => {
                //console.log(sfOpt.innerText)

                opTxt = sfOpt.innerText.trim()

                if (sfOpt.parentElement.className == "hidden-sf-options") {
                    opParentTxt = sfOpt.parentElement.parentElement.parentElement.parentElement.previousElementSibling.innerText.trim();
                } else {
                    opParentTxt = sfOpt.parentElement.parentElement.previousElementSibling.innerText.trim();
                }


                try {
                    filtersSeperated[opParentTxt].forEach(eachSepFilter => {
                        if (eachSepFilter.name == opTxt) {
                            opId = `${eachSepFilter.id}-${eachSepFilter.name}`
                            sfOpt.setAttribute('id', opId);
                            //console.log(eachFilter)
                        }
                    })
                } catch {
                    sfOpt.setAttribute('id', `0-${opTxt}`);
                    //console.log(sfOpt)
                }
            })



            allBfOpts.forEach(bfOpt => {
                //console.log(bfOpt.innerText)

                opTxt = bfOpt.innerText.trim()

                if (bfOpt.parentElement.className == "hidden-bf-options") {
                    opParentTxt = bfOpt.parentElement.parentElement.parentElement.parentElement.previousElementSibling.innerText.trim();
                } else {
                    opParentTxt = bfOpt.parentElement.parentElement.previousElementSibling.innerText.trim();
                }


                try {
                    filtersSeperated[opParentTxt].forEach(eachSepFilter => {
                        if (eachSepFilter.name == opTxt) {
                            opId = `${eachSepFilter.id}-${eachSepFilter.name}`
                            bfOpt.setAttribute('id', opId);
                        }
                    })
                } catch {
                    bfOpt.setAttribute('id', `0-${opTxt}`);
                    console.log(opTxt)
                    //console.log(opParentTxt)
                }
            })


            //setting event listeners for popular searches
            allPsBubbles = document.querySelectorAll('.ps-bubble');
            allPsBubbles.forEach(psBubble => {
                psBubble.addEventListener('click', () => {
                    sBox = document.querySelector('input.icon2')
                    sBox.value = psBubble.innerText.trim();
                    sBox.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'Enter' }));

                })

            })

            //dropdown
            document.addEventListener('click', function () {
                document.querySelector('.ip-dropdown').style.display = 'none';
            });
            document.querySelector('.ip-container input').addEventListener('click', (event) => {
                event.stopPropagation();
                document.querySelector('.ip-dropdown').style.display = 'block';
            })
        })
})


fetch('/scripts/products.json')
    .then(response => response.json())
    .then(data => {
        globalProductList = data;
        generatePlProducts(globalProductList.slice(0, 40));
    })























//function to shuffle array
function shuffleArray(array) {
    // Create a deep copy of the array (this will clone the objects inside)
    var newArray = JSON.parse(JSON.stringify(array));
    // Shuffle the copied array
    for (var i = newArray.length - 1; i >= 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = newArray[i];
        newArray[i] = newArray[j];
        newArray[j] = temp;
    }
    // Return the shuffled array
    return newArray;
}






//footer dropdown
function toggleFooter() {
    const mad = document.getElementById("mad");
    const arrow = document.getElementById('arrow');

    if (mad.style.display == "block") {
        mad.style.display = "none";
        arrow.style.transform = arrow.style.transform === 'rotate(0deg)' ? 'rotate(180deg)' : 'rotate(0deg)';
    } else {
        mad.style.display = "block";
        arrow.style.transform = arrow.style.transform === 'rotate(180deg)' ? 'rotate(0deg)' : 'rotate(180deg)';
    }
}

document.getElementById("mam").addEventListener("click", toggleFooter);




//sort-box
function toggleSortOptions() {
    const sobd = document.getElementById("sobd");
    const arrow2 = document.getElementById('arrow2');

    if (sobd.style.display == "block") {
        sobd.style.display = "none";
        arrow2.style.transform = arrow2.style.transform === 'rotate(0deg)' ? 'rotate(180deg)' : 'rotate(0deg)';
    } else {
        sobd.style.display = "block";
        arrow2.style.transform = arrow2.style.transform === 'rotate(180deg)' ? 'rotate(0deg)' : 'rotate(180deg)';
    }
}
document.getElementsByClassName("sort-box-parent")[0].addEventListener("click", toggleSortOptions);




//dropdown functionality for select filter boxes
const children = document.querySelectorAll('.select-filter-title-parent');

children.forEach(child => {
    child.addEventListener('click', function () {
        const sfbNs = this.nextElementSibling;
        const arrow3 = this.querySelector('img');;

        if (sfbNs.style.display == "block") {
            //hide extra options
            const sm = sfbNs.querySelector(".show-more");
            if (sm != null) {
                sm.style.display = "block";
                sm.nextElementSibling.style.display = "none";
            }


            sfbNs.style.display = "none";
            arrow3.style.transform = arrow3.style.transform === 'rotate(0deg)' ? 'rotate(180deg)' : 'rotate(0deg)';
        } else {
            sfbNs.style.display = "block";
            arrow3.style.transform = arrow3.style.transform === 'rotate(180deg)' ? 'rotate(0deg)' : 'rotate(180deg)';
        }
    });
});




//dropdown functionality for show more buttons
const smChildren = document.querySelectorAll('.show-more');

smChildren.forEach(child => {
    child.addEventListener('click', function () {
        const smNs = this.nextElementSibling;
        this.style.display = "none";
        if (smNs.className == "hidden-bf-options") {
            smNs.style.display = "flex";
        } else {
            smNs.style.display = "block";
        }

    });
});







//dropdown functionality for box filter boxes
const children2 = document.querySelectorAll('.box-filter-title-parent');

children2.forEach(child => {
    child.addEventListener('click', function () {
        const bfbNs = this.nextElementSibling;
        const arrow4 = this.querySelector('img');;

        if (bfbNs.style.display == "block") {
            //hide extra options
            const sm = bfbNs.querySelector(".show-more");
            if (sm != null) {
                sm.style.display = "block";
                sm.nextElementSibling.style.display = "none";
            }


            bfbNs.style.display = "none";
            arrow4.style.transform = arrow4.style.transform === 'rotate(0deg)' ? 'rotate(180deg)' : 'rotate(0deg)';
        } else {
            bfbNs.style.display = "block";
            arrow4.style.transform = arrow4.style.transform === 'rotate(180deg)' ? 'rotate(0deg)' : 'rotate(180deg)';
        }
    });
});




//box filter onclick
const bfOptions = document.querySelectorAll('.bf-option');
bfOptions.forEach(child => {
    child.addEventListener('click', function () {
        console.log(child.style.backgroundColor)
        if (child.style.backgroundColor == 'rgb(255, 255, 255)' || child.style.backgroundColor == '') {
            child.style.backgroundColor = "rgb(255, 231, 251)";
            child.childNodes[0].style.color = "rgb(159, 32, 137)";
            child.style.border = "1px solid rgb(217, 166, 208)";
        }
        else if (child.style.backgroundColor = "rgb(255, 231, 251)") {
            child.style.backgroundColor = 'rgb(255, 255, 255)';
            child.childNodes[0].style.color = "rgb(97, 97, 115)";
            child.style.border = "1px solid rgb(234, 234, 242)";
        }


    })
})







//select filter search
const allSearchInput = document.querySelectorAll('input.icon');
allSearchInput.forEach(searchInput => {
    searchInput.addEventListener('input', function () {
        let listItems;
        if (searchInput.parentElement.nextElementSibling.getElementsByClassName('hidden-sf-options')[0].style.display == 'none') {
            listItems = searchInput.parentElement.nextElementSibling.querySelectorAll('div > .sf-option:not(.hidden-sf-options .sf-option)');
        }
        else {
            listItems = searchInput.parentElement.nextElementSibling.getElementsByClassName('sf-option');
        }

        const query = searchInput.value.toLowerCase();

        for (let i = 0; i < listItems.length; i++) {
            const item = listItems[i];
            const itemText = item.textContent.replaceAll("\n", "").replaceAll(" ", "").toLowerCase();

            if (itemText.includes(query)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        }
    })

})





//sort functionality
sortTexts = ['Relevance', 'New Arrivals', 'Price (High to Low)', 'Price (Low to High)', 'Ratings', 'Discount'];

function sortProducts(chosen) {
    prevSelectedOption = document.querySelector('.sort-options-box');

    //change previous option bgcolor to normal.
    document.querySelectorAll('.sobd-option').forEach(option => {
        if (option.innerText == prevSelectedOption.innerText) {
            option.style.backgroundColor = 'inherit';
        }
    })

    prevSelectedOption.querySelector('span').innerText = chosen;

    //change current selected option bgcolor.
    document.querySelectorAll('.sobd-option').forEach(option => {
        if (option.innerText == chosen) {
            option.style.backgroundColor = 'rgb(255, 231, 251)';
        }
    })



    function sortRandomly() {
        let allProductsCard = document.querySelectorAll('.products-card');
        let currentProductsData = [];
        //get all current values
        allProductsCard.forEach(productsCard => {
            singleProductData = {};
            singleProductData.title = productsCard.querySelector('p').innerText;
            singleProductData.price = productsCard.querySelector('h5').innerText;
            singleProductData.rating = productsCard.querySelector('.rating-count').innerText;
            singleProductData.review = productsCard.querySelector('.reviews').innerText;
            singleProductData.image = productsCard.querySelector('img').getAttribute('src');
            singleProductData.moreTxt = productsCard.querySelector('.pc-corner').innerText;

            currentProductsData.push(singleProductData)
        })

        //shuffling to simulate sorting by relevance
        shuffledProds = shuffleArray(currentProductsData);
        let prodIndex = 0;
        allProductsCard.forEach(productsCard => {
            productsCard.querySelector('p').innerText = shuffledProds[prodIndex].title;
            productsCard.querySelector('h5').innerText = shuffledProds[prodIndex].price;
            productsCard.querySelector('.rating-count').innerText = shuffledProds[prodIndex].rating;
            productsCard.querySelector('.reviews').innerText = shuffledProds[prodIndex].review;
            productsCard.querySelector('img').src = shuffledProds[prodIndex].image;
            productsCard.querySelector('.pc-corner').innerText = shuffledProds[prodIndex].moreTxt;

            prodIndex += 1;
        })

    }




    //sorting the results
    if (chosen == sortTexts[0]) {
        let pl = document.querySelector('.pl-products');
        pl.style.display = 'none';
        setTimeout(function () {
            pl.style.display = 'block';
            sortRandomly();
        }, 200);

    }
    else if (chosen == sortTexts[1]) {
        let pl = document.querySelector('.pl-products');
        pl.style.display = 'none';
        setTimeout(function () {
            pl.style.display = 'block';
            sortRandomly();
        }, 200);
    }
    else if (chosen == sortTexts[5]) {
        let pl = document.querySelector('.pl-products');
        pl.style.display = 'none';
        setTimeout(function () {
            pl.style.display = 'block';
            sortRandomly();
        }, 200);
    }
    else if (chosen == sortTexts[2]) {
        let pl = document.querySelector('.pl-products');
        pl.style.display = 'none';
        setTimeout(function () {
            pl.style.display = 'block';

            let allProductsCard = document.querySelectorAll('.products-card');
            let currentProductsData = [];

            //console.log(allProductsCard[0])
            //get all current values
            allProductsCard.forEach(productsCard => {
                //console.log(productsCard)
                let singleProductData = {};
                singleProductData.title = productsCard.querySelector('p').innerText;
                singleProductData.price = productsCard.querySelector('h5').innerText;
                singleProductData.rating = productsCard.querySelector('.rating-count').innerText;
                singleProductData.review = productsCard.querySelector('.reviews').innerText;
                singleProductData.image = productsCard.querySelector('img').getAttribute('src');
                singleProductData.moreTxt = productsCard.querySelector('.pc-corner').innerText;

                currentProductsData.push(singleProductData)
            })




            //sorting as price high to low
            const priceSortedProds = currentProductsData.sort((a, b) => {
                const priceA = parseInt(a.price.replace('₹', '').trim());
                const priceB = parseInt(b.price.replace('₹', '').trim());
                return priceB - priceA;
            });


            let prodIndex = 0;
            allProductsCard.forEach(productsCard => {
                productsCard.querySelector('p').innerText = priceSortedProds[prodIndex].title;
                productsCard.querySelector('h5').innerText = priceSortedProds[prodIndex].price;
                productsCard.querySelector('.rating-count').innerText = priceSortedProds[prodIndex].rating;
                productsCard.querySelector('.reviews').innerText = priceSortedProds[prodIndex].review;
                productsCard.querySelector('img').src = priceSortedProds[prodIndex].image;
                productsCard.querySelector('.pc-corner').innerText = priceSortedProds[prodIndex].moreTxt;

                prodIndex += 1;
            })

        }, 200);

    }
    else if (chosen == sortTexts[3]) {
        let pl = document.querySelector('.pl-products');
        pl.style.display = 'none';
        setTimeout(function () {
            pl.style.display = 'block';

            let allProductsCard = document.querySelectorAll('.products-card');
            let currentProductsData = [];
            //get all current values
            allProductsCard.forEach(productsCard => {
                let singleProductData = {};
                singleProductData.title = productsCard.querySelector('p').innerText;
                singleProductData.price = productsCard.querySelector('h5').innerText;
                singleProductData.rating = productsCard.querySelector('.rating-count').innerText;
                singleProductData.review = productsCard.querySelector('.reviews').innerText;
                singleProductData.image = productsCard.querySelector('img').getAttribute('src');
                singleProductData.moreTxt = productsCard.querySelector('.pc-corner').innerText;

                currentProductsData.push(singleProductData)
            })




            //sorting as price high to low
            const priceSortedProds = currentProductsData.sort((a, b) => {
                const priceA = parseInt(a.price.replace('₹', '').trim());
                const priceB = parseInt(b.price.replace('₹', '').trim());
                return priceA - priceB;
            });


            let prodIndex = 0;
            allProductsCard.forEach(productsCard => {
                productsCard.querySelector('p').innerText = priceSortedProds[prodIndex].title;
                productsCard.querySelector('h5').innerText = priceSortedProds[prodIndex].price;
                productsCard.querySelector('.rating-count').innerText = priceSortedProds[prodIndex].rating;
                productsCard.querySelector('.reviews').innerText = priceSortedProds[prodIndex].review;
                productsCard.querySelector('img').src = priceSortedProds[prodIndex].image;
                productsCard.querySelector('.pc-corner').innerText = priceSortedProds[prodIndex].moreTxt;

                prodIndex += 1;
            })

        }, 200);
    }
    else {
        let pl = document.querySelector('.pl-products');
        pl.style.display = 'none';
        setTimeout(function () {
            pl.style.display = 'block';

            let allProductsCard = document.querySelectorAll('.products-card');
            let currentProductsData = [];
            //get all current values
            allProductsCard.forEach(productsCard => {
                let singleProductData = {};
                singleProductData.title = productsCard.querySelector('p').innerText;
                singleProductData.price = productsCard.querySelector('h5').innerText;
                singleProductData.rating = productsCard.querySelector('.rating-count').innerText;
                singleProductData.review = productsCard.querySelector('.reviews').innerText;
                singleProductData.image = productsCard.querySelector('img').getAttribute('src');
                singleProductData.moreTxt = productsCard.querySelector('.pc-corner').innerText;

                currentProductsData.push(singleProductData)
            })




            //sorting as rating
            const ratingSortedProds = currentProductsData.sort((a, b) => {
                const ratingA = a.rating;
                const ratingB = b.rating;

                return ratingB - ratingA;
            });


            let prodIndex = 0;
            allProductsCard.forEach(productsCard => {
                productsCard.querySelector('p').innerText = ratingSortedProds[prodIndex].title;
                productsCard.querySelector('h5').innerText = ratingSortedProds[prodIndex].price;
                productsCard.querySelector('.rating-count').innerText = ratingSortedProds[prodIndex].rating;
                productsCard.querySelector('.reviews').innerText = ratingSortedProds[prodIndex].review;
                productsCard.querySelector('img').src = ratingSortedProds[prodIndex].image;
                productsCard.querySelector('.pc-corner').innerText = ratingSortedProds[prodIndex].moreTxt;

                prodIndex += 1;
            })
        }, 200)


    }

}




let allSortOptions = document.querySelectorAll('.sobd-option');
allSortOptions.forEach(sortOption => {
    sortOption.addEventListener('click', function () {
        let sortOptionValue = this.innerText;
        sortProducts(sortOptionValue)
    })
})














//generate pl-products content
function splitIntoSublists(arr, size = 4) {
    const result = [];

    for (let i = 0; i < arr.length; i += size) {
        const sublist = arr.slice(i, i + size);
        result.push(sublist);
    }
    
    return result;
}

function generatePlProducts(products) {
    let plProducts = document.querySelector('.pl-products')
    plProducts.innerHTML = ''

    //split into pccs
    splittedProducts = splitIntoSublists(products);
    if(splittedProducts.length==0){
        
        plProducts.innerHTML='<div class="not-con"><h1>No products found</h1></div>'
    }
    splittedProducts.forEach(subSplitProds => {
        const productListContainer = document.createElement('div');
        productListContainer.classList.add('products-cards-container');

        subSplitProds.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('products-card');

            const imgContainer = document.createElement('div');
            imgContainer.classList.add('products-img-con');
            const productImg = document.createElement('img');
            productImg.src = product.image;
            imgContainer.appendChild(productImg);


            const cornerText = document.createElement('div');
            cornerText.classList.add('pc-corner');
            cornerText.textContent = product.moreTxt;
            imgContainer.appendChild(cornerText);


            const productMain = document.createElement('div');
            productMain.classList.add('pc-main');

            const productTitle = document.createElement('p');
            productTitle.textContent = product.title.length > 21 ? product.title.slice(0, 21) + " ..." : product.title;
            productMain.appendChild(productTitle);

            const productPrice = document.createElement('h5');
            productPrice.textContent = product.price;
            productMain.appendChild(productPrice);

            const freeDelivery = document.createElement('div');
            freeDelivery.classList.add('pc-fd');
            freeDelivery.textContent = 'Free Delivery';
            productMain.appendChild(freeDelivery);

            const ratingAndReviews = document.createElement('div');
            ratingAndReviews.classList.add('pc-rating-reviews');

            const ratingParent = document.createElement('div');
            ratingParent.classList.add('rating-parent');

            const ratingCount = document.createElement('span');
            ratingCount.classList.add('rating-count');
            ratingCount.textContent = product.rating;
            ratingParent.appendChild(ratingCount);

            const starImg = document.createElement('img');
            starImg.src = '/images/star.svg';
            ratingParent.appendChild(starImg);

            ratingAndReviews.appendChild(ratingParent);

            const reviewsText = document.createElement('span');
            reviewsText.classList.add('reviews');
            reviewsText.textContent = product.review;
            ratingAndReviews.appendChild(reviewsText);

            productMain.appendChild(ratingAndReviews);
            productCard.appendChild(imgContainer);
            productCard.appendChild(productMain);

            productListContainer.appendChild(productCard);
        });

        plProducts.appendChild(productListContainer)
        if(splittedProducts.length==0){
            console.log('5')
        }

    })


}
















//adding click event listener to filters
allSfOpts = document.querySelectorAll('.sf-option');
allBfOpts = document.querySelectorAll('.bf-option');

allFilterOpts = [...allSfOpts, ...allBfOpts]
genderTags = ['446-Boys', '445-Girls', '444-Men', '443-Women']


function filterProdsByFilterId(fids, gpl) {
    if (!currentSearchQuery.length == 0) {
        gpl = currentSearchResult
    }
    let filteredProductList = []
    gpl.forEach(eachProduct => {
        //filterinmg result
        if (fids.every(element => eachProduct.tags.includes(element))) {
            filteredProductList.push(eachProduct);
        }
    })

    //adding some artificial filters :)
    if (genderTags.some(item => fids.includes(item)) && filteredProductList.length == 0) {

        newFids = []
        roughFids = []
        fids.forEach(fid => {
            if (!genderTags.includes(fid)) {
                newFids.push(fid)
            } else {
                roughFids.push(fid.split("-")[1])
            }
        })
        //console.log(roughFids)
        roughFpl = filterProdsByFilterId(newFids, gpl)
        //console.log(filteredProductList)
        roughFpl.forEach(rFpl => {
            newElm = (roughFids.every(item => rFpl.title.includes(item))) ? rFpl : null
            if (newElm != null) {
                filteredProductList.push(newElm);
            }

        })
    }

    return filteredProductList;
}

/*
setTimeout(()=>{
    f=filterProdsByFilterId(['5117-Dresses'],globalProductList)
    generatePlProducts(f)
    console.log(f)
},4000)
*/






allFilterOpts.forEach(eachFilteropt => {
    eachFilteropt.addEventListener('click', (event) => {
        //console.log(event.target)

        if (event.target.type === 'checkbox' || event.target.parentElement.className == 'bf-option' || event.target.className == 'bf-option') {

            //console.log(eachFilteropt)
            isClicked = eachFilteropt.getAttribute('toggle');
            filterTag = eachFilteropt.getAttribute('id');
            if (isClicked != '1') {
                eachFilteropt.setAttribute('toggle', '1');
                //console.log(filterTag)
                currentFilterIds.push(filterTag);
                //console.log(currentFilterIds)
                filteredProducts = filterProdsByFilterId(currentFilterIds, globalProductList);
            } else {
                eachFilteropt.setAttribute('toggle', '0');
                const index4 = currentFilterIds.indexOf(filterTag);
                if (index4 > -1) {
                    currentFilterIds.splice(index4, 1);
                }
                //console.log(currentFilterIds)
                filteredProducts = filterProdsByFilterId(currentFilterIds, globalProductList);
            }
            if (currentFilterIds.length > 0) {
                clearFilterBtn.style.display = 'flex';
            } else if (currentFilterIds.length == 0) {
                clearFilterBtn.style.display = 'none';
            }
            setTimeout(() => {
                //console.log(filteredProducts)
                if (filteredProducts.length == 0) {
                    document.querySelector('.pl-products').innerHTML = '<div class="not-con"><h1>No products found</h1></div>'
                } else if (filteredProducts.length == 3367) {
                    generatePlProducts(globalProductList.slice(0, 40));
                    sortProducts(document.querySelector('.sort-options-box').innerText);
                }
                else {
                    generatePlProducts(filteredProducts);
                    sortProducts(document.querySelector('.sort-options-box').innerText);
                }

            }, 200)
        }

    })
})







//main search bar functionality
function generateRecentSearches(values) {
    const container = document.createElement('div');
    container.classList.add('rs-contents');
    values.reverse()
    values.forEach(value => {
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('rs-content');

        const img = document.createElement('img');
        img.setAttribute('src', '/images/history.svg');

        const p = document.createElement('p');
        p.textContent = value;

        contentDiv.appendChild(img);
        contentDiv.appendChild(p);

        container.appendChild(contentDiv);
    });

    const wrapper = document.createElement('div');

    const title = document.createElement('span');
    title.classList.add('rs-title');
    title.textContent = 'Recent Searches';

    wrapper.appendChild(title);
    wrapper.appendChild(container);

    return wrapper.innerHTML;
}

function generateSearchSuggestions(suggestions) {
    const container = document.createElement('div');
    suggestions.forEach(suggestion => {
        const suggestionDiv = document.createElement('div');
        suggestionDiv.classList.add('search-suggestion');


        const img = document.createElement('img');
        img.src = '/images/search.svg';

        const p = document.createElement('p');
        p.textContent = suggestion;


        suggestionDiv.appendChild(img);
        suggestionDiv.appendChild(p);

        container.appendChild(suggestionDiv);
    });

    return container.innerHTML;
}
/*
// Example usage:
const suggestionsArray = ['Kurta', 'Shirt', 'Jeans'];
const searchSuggestionsHTML = generateSearchSuggestions(suggestionsArray);

document.getElementById('suggestions-container').appendChild(searchSuggestionsHTML);
*/


function performSearch(event, qry) {
    document.querySelector('.first-ad-box-parent').style.display = 'none';
    document.querySelector('.line-container-parent').style.display = 'none';
    document.querySelector('.second-ad-boxes-parent').style.display = 'none';
    document.querySelector('.third-ad-box-parent').style.display = 'none';
    document.querySelector('.fourth-ad-box-parent').style.display = 'none';
    document.querySelector('.search-result-heading').innerHTML=`<p>${qry}</p>`
    newPageTitle=`Buy ${qry} Online at best prices at Meesho`
    document.title=newPageTitle
    if (event.key === 'Enter') {
        searchResult = []
        const query = qry;
        currentSearchQuery = query;

        globalProductList.forEach(product => {
            if (product.title.toLowerCase().includes(query)) {
                searchResult.push(product)
            }
        })
        currentSearchResult = searchResult;
        searchedProducts = filterProdsByFilterId(currentFilterIds, searchResult)
        if (searchedProducts.length == 3367) {
            setTimeout(() => {
                generatePlProducts(searchedProducts.slice(0, 40));
            }, 200)

        } else {
            setTimeout(() => {
                generatePlProducts(searchedProducts);
            }, 200)
        }

        sortProducts(document.querySelector('.sort-options-box').innerText);
    }
}

const mainSearchInput = document.querySelector('input.icon2');
mainSearchInput.addEventListener('keydown', function (event) {
    //alert(event.key)
    if (event.key == 'Enter') {
        //alert(1)
        event.preventDefault()
        const query = mainSearchInput.value.toLowerCase();
        currentSearchQuery = query;
        performSearch(event, query);
        searcheHistory.push(query);
        document.querySelector('.recent-searches').innerHTML = generateRecentSearches(searcheHistory);
        document.querySelector('.ip-dropdown').style.display = 'none';

    }
})

mainSearchInput.addEventListener('input', () => {
    if (mainSearchInput.value.length == 0) {
        document.querySelector('.rsps-parent').style.display = 'block';
        document.querySelector('.search-suggestion-parent').style.display = 'none';
    } else {
        document.querySelector('.rsps-parent').style.display = 'none';
        document.querySelector('.search-suggestion-parent').style.display = 'block';
        inputSearchRes = []

        globalProductList.forEach(eachProd => {
            if (eachProd.title.includes(mainSearchInput.value.toLowerCase())) {
                inputSearchRes.push((eachProd.title.length > 21 ? eachProd.title.slice(0, 21) + ' ...' : eachProd.title))
            }
        })
        searchSuggestionHtml = generateSearchSuggestions(inputSearchRes)
        document.querySelector('.search-suggestion-parent').innerHTML = searchSuggestionHtml;
        document.querySelectorAll('.search-suggestion').forEach(eachSs => {
            eachSs.addEventListener('click', () => {
                console.log(typeof eachSs.innerText)
                mainSearchInput.value = eachSs.innerText.endsWith(" ...") ? eachSs.innerText.substring(0, 16) : eachSs.innerText;
                mainSearchInput.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'Enter' }));
            })
        })
    }

})















/*
allBfOpts.forEach(eachFilterElement => {
    eachFilterElement.addEventListener('click', function (event) {

    })
})



allSfOpts.forEach(eachFilterElement => {
    eachFilterElement.addEventListener('click', function (event) {
        
        if (event.target.type === 'checkbox') {
            if (this.getAttribute("toggle") == "0") {
                this.setAttribute("toggle", "1");
                selectedFilters.push(this)

                
                selectedFilters.forEach(eachSelFilter => {
                    parentFilterTxt=eachSelFilter.parentElement.parentElement.previousElementSibling.innerText;
                    filterTxt = eachSelFilter.innerText;

                    found=0
                    filtersSeperated[parentFilterTxt].forEach(eachSepFilter => {
                        if (eachSepFilter.name == filterTxt && !currentFilterIds.includes(`${eachSepFilter.id}-${eachSepFilter.name}`)) {
                            currentFilterIds.push(`${eachSepFilter.id}-${eachSepFilter.name}`);
                            found=1
                            //console.log(eachFilter)
                        }
                    })
                })
                if(found==0){
                    currentFilterIds.push(`0-${this.innerText}`);
                }
                
                //filterTxt = this.innerText;
                //filtersSeperated.forEach(eachFilter => {
                  //  if (eachFilter.name == filterTxt) {
                    //    console.log(eachFilter)
                   // }
                //})
]
            } else {
                this.setAttribute("toggle", "0");
                const index = selectedFilters.indexOf(this);
                if (index > -1) {
                    selectedFilters.splice(index, 1);
                }

                selectedFilters.forEach(eachSelFilter => {
                    parentFilterTxt=eachSelFilter.parentElement.parentElement.previousElementSibling.innerText;
                    filterTxt = eachSelFilter.innerText;

                    found=0
                    filtersSeperated[parentFilterTxt].forEach(eachSepFilter => {
                        if (eachSepFilter.name == filterTxt) {
                            delFilterId=`${eachSepFilter.id}-${eachSepFilter.name}`
                            const index2 = currentFilterIds.indexOf(delFilterId);
                            if (index2 > -1) {
                                selectedFilters.splice(index2, 1);
                            }
                            found=1
                            console.log(delFilterId)
                            //console.log(eachFilter)
                        }
                    })
                    
                })
                if(found==0){
                    const index3 = currentFilterIds.indexOf(`0-${this.innerText}`);
                    currentFilterIds.splice(index3, 1);
                }
            }

        }
    })
})

*/

























/*after loading*/
window.onload = function () {
    document.getElementById("category-filter").click();
    document.getElementById("gender-filter").click();
};