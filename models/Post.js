
module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("Post",{
       
        content:{
            type: DataTypes.TEXT
        },
        coverUrl:{
            type: DataTypes.STRING
        },
       
    });

    return {name:"Post", schema:Post}
}