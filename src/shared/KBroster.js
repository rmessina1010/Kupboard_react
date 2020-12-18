export let kbRoster =
{
    kup_1: {
        img: "/assets/increase-curb-appeal.jpg",
        alt: "curbapeal",
        mast: "/assets/user_mast_1140x440.jpg",
        mastAlt: "curbmast",
        name: "Test Kupboard #1",
        address: "628 Beford Ave",
        city: "Madison",
        state: "WI",
        zip: "53711",
        itemTypeCt: 143,
        hours: [
            { day: "Mon.", toDay: "Web.", open: "10 am", close: "4pm" },
            { day: "Thrs.", toDay: null, open: "4 pm", close: "6pm" },
            { day: "Fri.", toDay: "Sat.", open: "1pm", close: "7pm" },
            { day: "Sun.", toDay: null, open: "5pm", close: "7pm" },
            { day: null, toDay: null, open: null, close: null }
        ],
        details: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem odio id, labore  or something",
        share: "http://facebook.com",
        userName: "Roger",
        userLastName: "Smith",
        userEmail: "rs@email.com",
        userPassword: 'fakepass',
        map: true,
        id: 1
    },

    kup_2: {
        img: "/assets/increase-curb-appeal.jpg",
        alt: "curbapeal",
        mast: "/assets/user_mast_1140x440.jpg",
        mastAlt: "curbmast",
        name: "Test Kupboard #2",
        address: "40 Bedford Street",
        city: "Rochester",
        state: "NY",
        zip: "14609",
        itemTypeCt: 143,
        hours: [
            { day: "Mon.", toDay: "Web.", open: "10 am", close: "4pm" },
            { day: "Thrs.", toDay: null, open: "4 pm", close: "6pm" },
            { day: "Fri.", toDay: "Sat.", open: "1pm", close: "7pm" },
            { day: "Sun.", toDay: null, open: "5pm", close: "7pm" },
            { day: null, toDay: null, open: null, close: null }
        ],
        details: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem odio id, labore  or something",
        share: "http://facebook.com",
        userName: "Roger",
        userLastName: "Smith",
        userEmail: "rs@email.com",
        userPassword: "fakepass2",
        map: true,
        id: 2
    },

    kup_3: {
        img: "/assets/increase-curb-appeal.jpg",
        alt: "curbapeal",
        mast: "/assets/user_mast_1140x440.jpg",
        mastAlt: "curbmast",
        name: "Test Kupboard #3",
        address: "1868 Beford Ave",
        city: "Rochester",
        state: "NY",
        zip: "14609",
        itemTypeCt: 143,
        hours: [
            { day: "Mon.", toDay: "Web.", open: "10 am", close: "4pm" },
            { day: "Thrs.", toDay: null, open: "4 pm", close: "6pm" },
            { day: "Fri.", toDay: "Sat.", open: "1pm", close: "7pm" },
            { day: "Sun.", toDay: null, open: "5pm", close: "7pm" },
            { day: null, toDay: null, open: null, close: null }
        ],
        details: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem odio id, labore  or something",
        share: "http://facebook.com",
        userName: "Roger",
        userLastName: "Smith",
        userEmail: "rs@email.com",
        userPassword: 'fakepass3',
        map: true,
        id: 3
    },

    kup_4: {
        img: "/assets/increase-curb-appeal.jpg",
        alt: "curbapeal",
        mast: "/assets/user_mast_1140x440.jpg",
        mastAlt: "curbmast",
        name: "Test Kupboard #4",
        address: "628 Beford Ave",
        city: "Madison",
        state: "WI",
        zip: "53711",
        itemTypeCt: 143,
        hours: [
            { day: "Mon.", toDay: "Web.", open: "10 am", close: "4pm" },
            { day: "Thrs.", toDay: null, open: "4 pm", close: "6pm" },
            { day: "Fri.", toDay: "Sat.", open: "1pm", close: "7pm" },
            { day: "Sun.", toDay: null, open: "5pm", close: "7pm" },
            { day: null, toDay: null, open: null, close: null }
        ],
        details: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem odio id, labore  or something",
        share: "http://facebook.com",
        userName: "Roger",
        userLastName: "Smith",
        userEmail: "rs@email.com",
        userPassword: 'fakepass4',
        map: false,
        id: 4
    },
    kup_5: {
        img: "/assets/increase-curb-appeal.jpg",
        alt: "curbapeal",
        mast: "/assets/user_mast_1140x440.jpg",
        mastAlt: "curbmast",
        name: "Test Kupboard #5",
        address: "628 Olive St",
        city: "Escondido",
        state: "CA",
        zip: "92025",
        itemTypeCt: 105,
        hours: [
            { day: "Mon.", toDay: "Web.", open: "10 am", close: "4pm" },
            { day: "Thrs.", toDay: null, open: "4 pm", close: "6pm" },
            { day: "Fri.", toDay: "Sat.", open: "1pm", close: "7pm" },
            { day: "Sun.", toDay: null, open: "5pm", close: "7pm" },
            { day: null, toDay: null, open: null, close: null }
        ],
        details: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem odio id, labore  or something",
        share: "http://facebook.com",
        userName: "Roger",
        userLastName: "Smith",
        userEmail: "rs@email.com",
        userPassword: 'fakepass5',
        map: true,
        id: 4
    }

};

export let kbItems = {
    itemsIn_2: {
        nextid: 10,
        inventory:
            [
                {
                    itemID: 2_1,
                    inKB: 2,
                    name: 'an item 1',
                    req: false,
                    active: true,
                    qty: 5
                },
                {
                    itemID: 2_2,
                    inKB: 2,
                    name: 'an item 1',
                    req: false,
                    active: true,
                    qty: 10
                },
                {
                    itemID: 2_3,
                    inKB: 2,
                    name: 'an item 1',
                    req: false,
                    active: true,
                    qty: 55
                },
                {
                    itemID: 2_4,
                    inKB: 2,
                    name: 'an item 1',
                    req: false,
                    active: true,
                    qty: 100
                },
                {
                    itemID: 2_5,
                    inKB: 2,
                    name: 'a request',
                    req: true,
                    active: true,
                    qty: 11
                },
                {
                    itemID: 2_6,
                    inKB: 2,
                    name: 'out of stock request',
                    req: true,
                    active: true,
                    qty: 0
                },
                {
                    itemID: 2_7,
                    inKB: 2,
                    name: 'also a request',
                    req: false,
                    active: true,
                    qty: 15
                },
                {
                    itemID: 2_8,
                    inKB: 2,
                    name: 'am hidden',
                    req: false,
                    active: false,
                    qty: 20
                },
                {
                    itemID: 2_9,
                    inKB: 2,
                    name: 'an item 1',
                    req: false,
                    active: true,
                    qty: 50
                },
                {
                    itemID: 2_10,
                    inKB: 2,
                    name: 'an item 1',
                    req: false,
                    active: true,
                    qty: 105
                },
            ]
    }
}

export let kbAnnounce = {
    commentsIn_2: {
        nextID: 4,
        announce:
            [
                {
                    comID: 2_1,
                    inKB: 2,
                    title: 'A coment title for 2_1',
                    text: 'This is the coment text..lorem ipsum'
                },
                {
                    comID: 2_2,
                    inKB: 2,
                    title: 'A coment title for 2_2',
                    text: 'This is the coment text..lorem ipsum'
                },
                {
                    comID: 2_3,
                    inKB: 2,
                    title: 'A coment title for 2_3',
                    text: 'This is the coment text..lorem ipsum'
                }
            ]
    }
}