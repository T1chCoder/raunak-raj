$(document).ready(function () {
    let activeMenu = false;
    
    $(document).on("click", "#menu-button", function (e) {
        e.stopPropagation();

        const icon = $(this).find("div[style]");

        if (activeMenu) {
            $("header").addClass("shadow-lg shadow-purple-500/10");
            closeMenu(icon);
        } else {
            $("header").removeClass("shadow-lg shadow-purple-500/10");

            icon.html(`
                <svg xmlns="http://www.w3.org/2000/svg" class="lucide lucide-x" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 6 6 18" />
                    <path d="M6 6l12 12" />
                </svg>
            `);

            const contentHtml = `
                <div class="h-0 overflow-hidden transition-all duration-300 ease-in-out flex flex-col bg-background/70 backdrop-blur-sm border-b border-purple-500/20 shadow-lg shadow-purple-500/10 md:hidden w-full absolute top-[100%] left-0" id="menu">
                    <div class="w-full flex justify-center items-center">
                        <a href="#services" class="hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-blue-600/20 hover:backdrop-blur-sm w-full p-4 flex justify-start items-center menu-link">
                            <span>Services</span>
                        </a>
                    </div>
                    <div class="w-full flex justify-center items-center">
                        <a href="#projects" class="hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-blue-600/20 hover:backdrop-blur-sm w-full p-4 flex justify-start items-center menu-link">
                            <span>Projects</span>
                        </a>
                    </div>
                    <div class="w-full flex justify-center items-center">
                        <a href="#contact" class="hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-blue-600/20 hover:backdrop-blur-sm w-full p-4 flex justify-start items-center menu-link">
                            <span>Contact</span>
                        </a>
                    </div>
                </div>
            `;

            $("#header-container").append(contentHtml);
            setTimeout(function () {
                $("#menu").addClass("!h-[169px]");
            }, 0);
            activeMenu = true;
        }
    });

    $(document).on("click", function (e) {
        const $target = $(e.target);
        if (
            activeMenu &&
            !$target.closest("#menu").length &&
            !$target.closest("#menu-button").length
        ) {
            const icon = $("#menu-button").find("div[style]");
            closeMenu(icon);
        }
    });

    $(document).on("click", "#menu a", function () {
        const icon = $("#menu-button").find("div[style]");
        closeMenu(icon);
    });

    // 🔽 Закрытие меню при прокрутке
    $(window).on("scroll", function () {
        if (activeMenu) {
            const icon = $("#menu-button").find("div[style]");
            closeMenu(icon);
        }
    });

    function closeMenu(icon) {
        $("#menu").removeClass("!h-[169px]");
        icon.html(`
            <svg xmlns="http://www.w3.org/2000/svg" class="lucide lucide-menu" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 12h16" />
                <path d="M4 18h16" />
                <path d="M4 6h16" />
            </svg>
        `);
        setTimeout(function () {
            $("#menu").remove();
            activeMenu = false;
        }, 300);
    }
});
