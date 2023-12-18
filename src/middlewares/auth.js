export const checkUserAuthenticated = (req,res,next)=>{
    if(req.session?.userInfo){
        next();
    }else{
        res.redirect("/login");
    }
};

export const showProductsView = (req,res,next)=>{
    if(req.session?.userInfo){
        res.redirect("/products");
    }else{
        next();
    }
};

export const showLoginView = (req,res,next)=>{
    if(req.session?.userInfo){
        res.redirect("/perfil");
    }else{
        next();
    }
};

export const checkRole=(roles)=>{
    return (req,res,next)=>{
        if(roles.includes(req.user.role)){
            next();
        }else{
            res.json({status:"error", message:"No estas habilitado para esta accion"});
        }
    }
}