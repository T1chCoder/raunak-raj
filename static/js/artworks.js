$(document).ready(function () {
    const categoryButtons = [
        "#button-artworks-category-featured", 
        "#button-artworks-category-thumbnails",
        "#button-artworks-category-logos"
    ];

    const container = "#artworks-container";

    const cards = {
        1: {
            imageUrl: "/static/image/job-1.jpg",
            isThumbnail: true,
            isFeatured: true
        },
        2: {
            imageUrl: "/static/image/job-2.jpeg",
            isLogo: true,
            isFeatured: true
        },
        3: {
            imageUrl: "/static/image/job-3.jpg",
            isThumbnail: true,
            isFeatured: true
        },
        4: {
            imageUrl: "/static/image/job-4.jpeg",
            isLogo: true,
            isFeatured: true
        },
        5: {
            imageUrl: "/static/image/job-5.png",
            isThumbnail: true,
            isFeatured: true
        },
        6: {
            imageUrl: "/static/image/job-6.jpeg",
            isLogo: true,
            isFeatured: true
        },
        7: {
            imageUrl: "/static/image/job-7.jpg",
            isThumbnail: true
        },
        8: {
            imageUrl: "/static/image/job-8.jpg",
            isThumbnail: true
        },
        9: {
            imageUrl: "/static/image/job-9.jpg",
            isThumbnail: true
        },
        10: {
            imageUrl: "/static/image/job-10.jpg",
            isThumbnail: true
        }
    };

    const CategoryButtonActiveClasses = "bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg border border-transparent";
    const CategoryButtonInactiveClasses = "border bg-background text-foreground hover:text-accent-foreground bg-input/30 hover:bg-input/50 border-border/50 hover:border-purple-500/50 hover:bg-purple-500/10 border-[var(--border)]";

    const getCardHtml = (imageUrl, label, cardClass) => {
        return `
        <div style="transform-style: preserve-3d; opacity: 1; transform: none; flex: 16 0 0;" class="${cardClass}">
          <div data-slot="card" data-slot-expandable="true" class="border-[var(--border)] text-card-foreground w-full h-full flex flex-col gap-6 rounded-xl border overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-purple-500/50 transition-all duration-300 group cursor-pointer">
            <div class="w-full h-full overflow-hidden relative">
              <img src="${imageUrl}" alt="${label}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
              <div class="absolute top-4 left-4">
                <span class="bg-gradient-to-r from-purple-600/90 to-blue-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">${label}</span>
              </div>
            </div>
          </div>
        </div>
        `;
    };

    categoryButtons.forEach(selector => {
        $(selector).on("click", function () {
            categoryButtons.forEach(btn => {
                $(btn)
                    .removeClass(CategoryButtonActiveClasses)
                    .addClass(CategoryButtonInactiveClasses);
            });

            $(this)
                .removeClass(CategoryButtonInactiveClasses)
                .addClass(CategoryButtonActiveClasses);

            const selectedId = $(this).attr("id");
            let filteredCards = [];

            if (selectedId === "button-artworks-category-featured") {
                filteredCards = Object.values(cards).filter(card => card.isFeatured);
            } else if (selectedId === "button-artworks-category-thumbnails") {
                filteredCards = Object.values(cards).filter(card => card.isThumbnail);
            } else if (selectedId === "button-artworks-category-logos") {
                filteredCards = Object.values(cards).filter(card => card.isLogo);
            }

            $(container).empty();

            filteredCards.forEach(card => {
                let cardClass = card.isLogo
                    ? "min-w-[258px] lg:max-w-[315px] max-w-[559px] aspect-[1/1]"
                    : "min-w-[458px] max-w-[561px] aspect-[16/9]";

                const label = card.isThumbnail ? "YT Thumbnail" : card.isLogo ? "Logo" : "Featured";
                const cardHtml = getCardHtml(card.imageUrl, label, cardClass);
                $(container).append(cardHtml);
            });
        });
    });

    function showModal(cardHtml) {
        $("#card-modal").remove();
        $(window).off("resize.cardModal");
        $("html").css("overflow", "hidden");

        const $temp = $("<div>").html(cardHtml);
        const $card = $temp.find("[data-slot='card']");

        $card.removeAttr("data-slot-expandable");
        $card.removeClass("cursor-pointer");

        const cleanCardHtml = $temp.html();

        const modalHtml = `
            <div id="card-modal" class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
                <button id="modal-close-button"
                    class="absolute top-5 right-5 z-50
                        w-10 h-10
                        text-white text-xl font-bold
                        bg-black/50 border border-neutral-400
                        rounded-full
                        transition-all duration-300 ease-in-out
                        hover:bg-red-500 hover:border-red-500 hover:scale-110">
                    &times;
                </button>
                <div id="modal-content" class="relative flex justify-center items-center max-w-6xl w-[80%] h-[80%] md:w-[90%] md:h-[90%]">
                    <div id="card-modal-inner-wrapper" class="stop-prop" style="transform-origin: center; transition: transform 0.3s ease;">
                        ${cleanCardHtml}
                    </div>
                </div>
            </div>   
        `;

        $("body").append(modalHtml);

        function applyScale() {
            const parent = $("#modal-content");
            const wrapper = $("#card-modal-inner-wrapper")[0];

            if (!parent.length || !wrapper) return;

            const parentWidth = parent.width();
            const parentHeight = parent.height();

            const actualWidth = wrapper.scrollWidth;
            const actualHeight = wrapper.scrollHeight;

            const scaleX = parentWidth / actualWidth;
            const scaleY = parentHeight / actualHeight;

            let scale = Math.min(scaleX, scaleY);

            wrapper.style.transform = `scale(${scale})`;
        }


        setTimeout(applyScale, 0);

        $(window).on("resize.cardModal", function () {
            applyScale();
        });

        $(document).on("click", "#card-modal, #modal-close-button", function (e) {
            const $target = $(e.target);
            const $current = $(e.currentTarget);

            if (
                $current.is("#card-modal") || 
                $target.is("#modal-close-button")
            ) {
                $("#card-modal").remove();
                $("html").css("overflow", "");
                $(window).off("resize.cardModal");
            }
        });

    }

    $(document).on("click", "[data-slot-expandable='true']", function () {
        const cardHtml = $(this).closest("div[style]").prop("outerHTML");
        showModal(cardHtml);
    });
});
