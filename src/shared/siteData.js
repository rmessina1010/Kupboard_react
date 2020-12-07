const siteData = {

    log: {
        isLogged: true,
        userData: {
            name: 'a name string',
            id: 12345,
            key: 'passw'
        }
    },
    info: {
        copyright: 2020,
        siteName: 'Kupboard',
        author: 'Ray Messina Design',
        authorURL: 'raymessinadesign.com'
    },
    social:
        [{
            id: 1,
            name: "Facebook",
            icon: "fa fa-facebook",
            url: "facebook.com/somama"
        },
        {
            id: 2,
            name: "Instagram",
            icon: "fa fa-instagram",
            url: "instagram.com/somama"
        },
        {
            id: 3,
            name: "Twitter",
            icon: "fa fa-twitter",
            url: "twitter.com/somama"
        },
        {
            id: 4,
            name: "Google Plus",
            icon: "fa fa-google-plus",
            url: "googleplus.com/somama"
        },
        {
            id: 5,
            name: "Share",
            icon: "fa fa-share-alt",
            url: "facebook.com/somama"
        }]
    ,
    pages: [{
        id: 1,
        text: "Home",
        icon: "fa fa-house",
        url: "/",
        include: [],
        exclude: []
    },
    {
        id: 2,
        text: "About",
        icon: "fa fa-house",
        url: "/about",
        include: [],
        exclude: []
    },
    {
        id: 3,
        text: "Find",
        icon: "fa fa-house",
        url: "/find",
        include: [],
        exclude: []
    },
    {
        id: 4,
        text: "Join",
        icon: "fa fa-house",
        url: "/signup",
        include: [],
        exclude: []
    },
    {
        id: 5,
        text: "TOS",
        icon: "fa fa-doc",
        url: "/tos",
        include: ['footer'],
        exclude: []
    }],
    nextID: {
        pages: 6,
        social: 6
    }
}

export default siteData;