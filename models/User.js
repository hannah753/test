module.exports=(sequelize, DataTypes)=>{
    const User = sequelize.define("User",{
        username:{
            type:DataTypes.STRING,
            unique:true,
            allowNull: false
        },
        password:{
            type:DataTypes.STRING,
            allowNull: false
        },
        gender:{
            type:DataTypes.TEXT('tiny')
        },
        fullName:{
            type:DataTypes.STRING
        },
        email:{
            type:DataTypes.STRING
        },
    });

    return {name:"User", schema:User}
}