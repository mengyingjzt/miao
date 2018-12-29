require(['../js/config.js'], function() {
    require(['jquery', 'swiper', 'bscroll'], function($, swiper, bscroll) {
        var swiper = new swiper(".banner", {
            autoplay: true,
            clickable: true,
        })

        var bscroll = new bscroll(".mao", {
            probeType: 2,
            click: true
        })

        function init() {
            getData();
        }


        function getData() {
            $.ajax({
                url: "/api/list",
                dataType: "json",
                success: function(res) {
                    if (res.code = 1) {
                        render(res.data)
                    }
                }
            })

            function render(data) {
                var str = "";
                data.forEach(function(item) {
                    str += `<dl>
                    <dt><img src="${item.img}" alt=""></dt>
                    <dd>
                        <h2>${item.title}</h2>
                        <p class="sty">规格:<span>${item.sty}</span></p>
                        <p class="price">${item.price}</p>
                    </dd>
                </dl>`;
                    $(".con").append(str);
                })
            }
        }
        init();
    })
})