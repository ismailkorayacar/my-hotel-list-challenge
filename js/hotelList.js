function lazyLoadImage() {
    var lazyImages = [].slice.call(document.querySelectorAll(".lazy-loaded-image.lazy"));
    let lazyImageObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                let lazyImage = entry.target;
                lazyImage.src = lazyImage.dataset.src;
                lazyImage.classList.remove("lazy");
                lazyImageObserver.unobserve(lazyImage);
            }
        });
    });
    lazyImages.forEach(function (lazyImage) {
        lazyImageObserver.observe(lazyImage); 
    });
}

(function () {
    const hotelListAPI = "/api/hotels.json";
    const htmlWrapper = $('.hotelListWrapper');
    $.getJSON(hotelListAPI, function (data) {
        $.each(data, function (index, element) {
            htmlWrapper.append(
                $(
                    '<article>' +
                    '<div class="panel panel-default"> <div class="panel-heading">' +
                    '<h2>' +
                    ' <a href="' + element.url + '" title="' + element.hotelName + '" target="_blank" id="' + element.hotelId + '" data-decid=""' + element.hotelName + '">' + element.hotelName + '</a>' +
                    '</h2>' +
                    '<a href="' + element.url + '" target="_blank">' +
                    '<div class="' + element.customersPointCssName + ' position-relative"> <div class="score__left">' +
                    '<div class="title">' + element.customersPointText + '</div>' +
                    '<div class="desc">' + element.reviewCount + ' Değerlendirme</div>' +
                    '</div>' +
                    '<div class="score__right"> ' + element.customerScore + ' </div>' +
                    '</div>' +
                    '</a>' +
                    ' </div> ' +
                    '<div class="panel-body">' +
                    ' <div class="">' +
                    '<div class="col-lg-4 col-md-3 col-sm-4 col-xs-12 img-mask">' +
                    '<a href="' + element.url + '" target="_blank">' +
                    '<img width="257" height="171" data-src="' + element.photoPath + '" title="' + element.hotelName + '" alt="' + element.hotelName + '" class="img-responsive lazy-loaded-image lazy" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==">' +
                    '</a>' +
                    ' <div class="badge-list badge-list--top-right badge-list--bottom-right-mobile"> </div>' +
                    '<div class="badge-list badge-list--bottom-left" data-magic="False">' +
                    '<div class="badge-list__item badge-list__item--payathotel" data-toggle="tooltip" data-placement="top" title="" data-original-title="%25 Ön Ödeme Yaparak Rezervasyonunuzu Tamamlayabilirsiniz">' +
                    ' <span>Ön Ödeme Fırsatı</span>' +
                    ' </div>' +
                    '<div class="badge-list__item badge-list__item--covid" data-toggle="tooltip" data-placement="top" title="" data-original-title="Sağlıklı Turizm Sertifikalı">' +
                    ' <span>Sağlık Sertifikalı</span>' +
                    ' </div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="col-lg-5 col-md-6 col-sm-5 col-xs-6 otel-list__content">' +
                    ' <p> <i class="fa fa-map-marker" aria-hidden="true"></i> ' + element.areaName + " - " + element.subAreaName + ' </p>' +
                    '<p class="erk-promo">' + element.campaignName + '</p>' +
                    '<div class="free-cancellation-info" data-toggle="tooltip" data-placement="top" title="" data-original-title="Girişte Öde ile rezervasyon yaparak giriş gününe 72 saat kalaya kadar ücretsiz koşulsuz iptal fırsatından yararlanabilirsiniz.">' +
                    ' <img src="./images/icon/room-card-info-icon.svg" width="14" height="14" alt="Ücretsiz İptal">' +
                    ' Ücretsiz İptal' +
                    ' </div>' +
                    '<div class="hotelFeatures"><ul class="hotelFeaturesList">' + (element.hotelPropertyList.map(hotelProperty => '<li class="hotelFeaturesList__hotelFeaturesTooltip">' + hotelProperty.name + '</li>').join("")) + '</ul></div>' +
                    '</div>' +
                    '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-6 otel-list__price-box">' +
                    ' <div class="otel-list__price-box__content">' +
                    '<p class="hostel-type">' + element.accommodation + '</p>' +
                    '<p class="currency">' + element.price + '<small class="price-currency"> ' + element.currency + '</small></p>' +
                    '<p class="discount-price">' + parseFloat(element.discountPrice.toString().match(/^\d+(?:\.\d{0,2})?/)) + '<small class="price-currency"> ' + element.currency + '</small>' +
                    ' </p>' +
                    '<a href="' + element.url + '" target="_blank" class="btn btn-block btn-primary">Detayları İncele</a>' +
                    ' </div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</article>'
                ));
        });
    }).done(function (data) {
        lazyLoadImage();
    });
})();