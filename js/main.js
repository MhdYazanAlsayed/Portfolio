const avatarButton = $("[avatar-button]")
const avatarModal = $("[avatar-modal]")
const avatarOverlay = $("[overlay]")
const menuLinks = _("[menu-links] a")
const root = $("#root")

let sections = [
    `
    <div class="section">
        <div class="box show-up">
            <h4>Who Am I <i class="fa-solid fa-question"></i></h4>
            <p>
                My name's mohammed yazan <br />
                I'm 22 years old <br />
                I'm from Damascus Syria <br />
                I work as programmer <br />
                I speak arabic and i learning english now
            </p>
        </div>

        <div class="box show-up">
            <h4>Education <i class="fa-solid fa-school"></i></h4>
            <p>
                I graduated from Bassam Kiki School, majoring in computers <br />
                I started studying computer science at Damascus University since 2018, and I am still studying until now
            </p>
        </div>

        <div class="box show-up">
            <h4>Experience <i class="fa-solid fa-person-digging"></i></h4>
            <p>
                I working freelancer from 2018<br />
                I worked at I.B.C company in Syria <br />
                I worked at SamaSoft company
            </p>
        </div>
    </div>
` ,
`
    <div class="section show-up" skills>
        <div class="skill">
            <h4>C# Programming</h4>
            <span>+7 Years Experience</span>
        </div>

        <div class="skill">
            <h4>Asp.Net Core</h4>
            <span>All Frameworks</span>
        </div>

        <div class="skill">
            <h4>Windows Form App</h4>
            <span>And Wpf</span>
        </div>

        <div class="skill">
            <h4>Front-End</h4>
            <span>Html,Css,Js,jQuery,Bootstrap</span>
        </div>

        <div class="skill">
            <h4>React js</h4>
            <span>1 Years Experience</span>
        </div>

        <div class="skill">
            <h4>Microsoft Sql Server</h4>
            <span>MySql,Access,Excel,Oracle</span>
        </div>
    </div>    
` ,
`
    <div class="section show-up" projects>
        <a href="https://www.youtube.com/watch?v=2NlJPKNiQJ0" target="_blank" class="project" style="background-image: url(images/whatsapp.png)">
            <div class="caption">
                <h4>WhatsApp Clone</h4>
                <span>React js + Asp.Net Core Api</span>
            </div>
        </a>

        <a href="https://www.youtube.com/watch?v=9veEULOlX80" target="_blank" class="project" style="background-image: url(images/instagram.webp)">
            <div class="caption">
                <h4>Instagram Clone</h4>
                <span>React js</span>
            </div>
        </a>
    <div>
`
]

//Configure Color Scheme
let colorScheme = Math.floor(Math.random() * 2);
if (colorScheme === 1) {
    avatarButton.src = "images/me-aqua.jpg";
    $('body').style.setProperty("--color-base" , "var(--aqua)");
} else {
    avatarButton.src = avatarModal.children[1].src = "images/me-yellow.jpg";
    $('body').style.setProperty("--color-base" , "var(--yellow)");
}


//Show main section
root.innerHTML = sections[0]

avatarButton.addEventListener('click' , () => {
    avatarModal.toggleAttribute('close')
    avatarModal.children[1].classList.remove('modal-close')
    avatarModal.children[1].classList.add('modal-open')
})
avatarOverlay.addEventListener('click' , () => {
    avatarModal.children[1].classList.remove('modal-open')
    avatarModal.children[1].classList.add('modal-close')
    setTimeout(() => { 
        avatarModal.toggleAttribute('close')
    } , 200)
})
menuLinks.forEach(element => {
    element.addEventListener('click' , e => {
        e.preventDefault();
        if (e.target.classList.contains('active')) return;

        $("[menu-links] a.active").classList.remove('active')
        e.target.classList.add('active')
        root.innerHTML = sections[parseInt(e.target.getAttribute('data-action'))]
    })
})

function $ (selector) {
    return document.querySelector(selector);
}
function _ (selector) {
    return document.querySelectorAll(selector)
}