module.exports=(sequelize, DataTypes)=>{
    const Comment = sequelize.define("Comment",{
        
        comment:{
            type:DataTypes.STRING
        },
        parentId: {
            type: DataTypes.INTEGER,
            hierarchy: true
          }
    });
    //Comment.isHierarchy();
    return {name:"Comment", schema:Comment}
}