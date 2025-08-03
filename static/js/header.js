$(document).ready(function () {
    let activeMenu = false;
    
    $(document).on("click", "#menu-button", function () {
        const icon = $(this).find("div[style]");

        if (activeMenu) {
            icon.html(`
                <svg xmlns="http://www.w3.org/2000/svg" class="lucide lucide-menu" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 12h16" />
                    <path d="M4 18h16" />
                    <path d="M4 6h16" />
                </svg>
            `);

            $("#menu").remove();
            
            activeMenu = false;
        }
        else {
            icon.html(`
                <svg xmlns="http://www.w3.org/2000/svg" class="lucide lucide-x" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 6 6 18" />
                    <path d="M6 6l12 12" />
                </svg>
            `);

            const contentHtml = `
                <div class="flex flex-col bg-background/70 backdrop-blur-xl border-b border-purple-500/20 shadow-lg shadow-purple-500/10 justify-center items-center md:hidden w-full absolute top-[100%] left-0" id="menu">
                    <div class="w-full flex justify-center items-center">
                        <a href="#services" class="w-full p-4 flex justify-start items-center">
                            <span>Services</span>
                        </a>
                    </div>
                    <div class="w-full flex justify-center items-center">
                        <a href="#projects" class="w-full p-4 flex justify-start items-center">
                            <span>Projects</span>
                        </a>
                    </div>
                    <div class="w-full flex justify-center items-center">
                        <a href="#contact" class="w-full p-4 flex justify-start items-center">
                            <span>Contact</span>
                        </a>
                    </div>
                </div>
            `;

            $("header").append(contentHtml);
            
            activeMenu = true;
        }
    });
});