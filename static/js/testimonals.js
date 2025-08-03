$(document).ready(function () {
    const buttonNext = "#button-testimonals-next";
    const buttonBack = "#button-testimonals-back";

    const buttonRedirectors = `${buttonBack},${buttonNext}`;

    const container = "#testimonals-container";
    const redirectorsContainer = "#testimonals-redirectors-container";
    const redirectorButtons = $(redirectorsContainer).find("button");

    const cards = {
        1: {
            rating: 5,
            text: "I'm proud to have built trust with over 50+ happy clients 💼✨ across various projects in graphic design, branding, and digital creativity 🎨🚀. My dedication to quality work ✅, timely delivery ⏱️, and clear communication 💬 has helped me build strong relationships with clients like Lakshay Kaushik, Rahul Singh, and Rajit Saxsena — and many more are joining every week! 🌟",
            user: {
                imageUrl: "/raunak-raj/static/image/pfp-1.jpg",
                name: "Lakshay",
                surname: "Kaushik",
            }
        },
        2: {
            rating: 5,
            text: "I’ve delivered 50+ creative projects for startups, entrepreneurs, and artists 🚀🎨 — from custom logos to full brand identities. Clients like Mira Kapoor, Josh Thomas, and Ankit Verma trust my work for its quality, speed, and attention to detail ✅🕒. Each project is a chance to grow and inspire — new ideas always welcome! 🌟",
            user: {
                imageUrl: "/raunak-raj/static/image/pfp-2.jpg",
                name: "Rahul",
                surname: "Singh"
            }
        },
        3: {
            rating: 5,
            text: "Clients return not just for design — but for the creative spark I bring 🔥🎯. I’ve crafted posters, banners, and brand visuals for all kinds of businesses 🏢🖼️. Trusted by Alina Roy, Tushar Jain, and Kavya Narang, most projects come through referrals 📣✨. If you’ve got an idea, I’d love to bring it to life 💡🎨.",
            user: {
                imageUrl: "/raunak-raj/static/image/pfp-3.jpg",
                name: "Rajit",
                surname: "Saxsena"
            }
        }
    }

    const getCardHtml = (rating, text, user) => {
        const generateStars = (rating) => {
            let stars = '';
            
            for (let i = 1; i <= 5; i++) {
                if (rating >= i) {
                    stars += '<span class="text-yellow-400">⭐</span>';
                } else if (rating >= i - 0.5) {
                    stars += '<span class="text-yellow-400">⭐</span>';
                } else {
                    stars += '<span class="text-gray-300">⭐</span>';
                }
            }
            
            return stars;
        };

        
        return `
            <div class="absolute inset-0" style="
                transform-style: preserve-3d;
                opacity: 1;
                transform: none;
                ">
                <div data-slot="card"
                    class="border-[var(--border)] text-card-foreground gap-3 rounded-xl border h-full bg-card/50 backdrop-blur-sm border-border/50 p-8 flex flex-col justify-center items-center text-center relative overflow-hidden group hover:border-purple-500/50">
                  <div
                    class="absolute inset-0 w-full h-full bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 from-purple-500/5 to-blue-500/5">
                  </div>
                  <div class="text-6xl text-purple-400/30" style="transform: none">
                    "
                  </div>
                  <div class="relative z-10" style="opacity: 1; transform: none">
                    <p class="text-lg text-[var(--muted-foreground)] mb-8 leading-relaxed max-w-2xl">
                      ${text}
                    </p>
                    <div class="flex items-center justify-center gap-4">
                      <div>
                        <img
                          src="${user.imageUrl}"
                            alt="${user.name} ${user.surname}"
                          class="w-16 h-16 rounded-full object-cover border-2 border-purple-500/30" />
                      </div>
                      <div class="text-left">
                        <h4 class="font-semibold text-foreground">
                          ${user.name} ${user.surname}
                        </h4>
                        <div class="flex gap-1 mt-1">
                            ${generateStars(rating)}
                        </div>
                      </div>
                    </div>
                    </div>
                </div>
            </div>
        `;
    };

    let activeCardId = 1;
    let activeCardIdChanged = false;

    const keys = Object.keys(cards);

    const lastKey = keys[keys.length - 1];
    const firstKey = keys[0];

    const firstCardId = parseInt(firstKey);
    const lastCardId = parseInt(lastKey);

    function changeRedirector() {
        if (activeCardIdChanged === true) {
            activeCardIdChanged = false;

            const buttons = redirectorButtons;

            const activeClass = "bg-gradient-to-r from-purple-600 to-blue-600";
            const inactiveClass = "bg-[var(--muted-foreground)] opacity-[0.3] hover:opacity-[0.5]";

            buttons.each(function () {
                $(this)
                    .addClass(inactiveClass)
                    .removeClass(activeClass);
            });

            activeButton = buttons.eq(activeCardId - 1);

            activeButton
                .addClass(activeClass)
                .removeClass(inactiveClass);
        }
    }

    function changeCard() {
        if (activeCardIdChanged === true) {
            changeRedirector();

            $(container).empty();

            const card = cards[activeCardId];
            const cardHtml = getCardHtml(card.rating, card.text, card.user);

            $(container).append(cardHtml);
        }
    }

    function setChangeCard() {
        activeCardIdChanged = true;
        changeCard();
    }

    $(document).on("click", buttonRedirectors, function (e) {        
        if ($(e.target).is(buttonNext) && activeCardId !== lastCardId) {
            activeCardId++;
            setChangeCard();
        }
        else if ($(e.target).is(buttonBack) && activeCardId !== firstCardId) {
            activeCardId--;
            setChangeCard();
        }
    });

    redirectorButtons.each(function (index) {
        $(this).on("click", function () {
            const id = index + 1;

            if (id !== activeCardId) {
                activeCardId = id;
                setChangeCard()
            }
        });
    });
});