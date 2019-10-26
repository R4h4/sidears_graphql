const faker = require('faker');
const jsonfile = require('jsonfile');

const numUsers = 10;
const ideasPerUser = 5;

const udata = [];
const idata = [];
const userNames = [];

faker.seed(1000);

for (let i = 0; i < numUsers; i++) {
    const username = faker.internet.userName();
    userNames.push(username);
}

for (let i = 0; i < userNames.length; i++) {
    const following = [];

    //create user info
    const upvotes_count = faker.random.number({
        min: 1,
        max: 5000,
    });

    const description = faker.name.jobTitle();

    const userInfo = {
        username: userNames[i],
        description: description,
        upvotes_count: upvotes_count,
    };

    udata.push(userInfo);

    //create idea info
    for (let j = 0; j < ideasPerUser; j++) {
        const id = faker.random.uuid();

        const ideaInfo = {
            username: userNames[i],
            idea_id: id,
            idea: faker.lorem.sentence(),
            upvote_count: faker.random.boolean(),
            created_at: faker.date.between('2019-01-01', '2019-10-26'),
        };

        idata.push(ideaInfo);
    }
}

const ufile = 'Users.json';
const ifile = 'Ideas.json';

jsonfile.writeFileSync(ufile, udata, function(err) {
    if (err) {
        console.error(err);
    } else {
        console.log('data created successfully');
    }
});

jsonfile.writeFileSync(ifile, idata, function(err) {
    if (err) {
        console.error(err);
    } else {
        console.log('data created successfully');
    }
});