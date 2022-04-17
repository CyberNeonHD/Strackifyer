function displayNotReady(){
    const $cardData = document.querySelector('#card-data');
    $cardData.innerHTML = '';
    //$cardData.insertAdjacentHTML("afterbegin", `<h2>Your <span>top 3 albums</span></h2>`);
    $cardData.insertAdjacentHTML("beforeend", `<div id="information" class="red">
            <h2>I'm sorry!</h2>
            <h3>This function will be available soon</h3>
            <p>I was quite busy with college and didn't want to re-schedule the release, so I skipped this function.
                But I can assure you that this feature will be available very soon!
            </p>
        </div>
    `);
}
