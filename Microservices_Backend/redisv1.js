const express = require('express')
const app = express()
const {get,set,setnx,exists,incrby,decrby,connect} = require('./model.redis')

app.get('/order',async (req,res,next)=>{
    await connect()
    const time = new Date().getTime()
    console.log(`Time request: ${time}`);
    //Gia su so luong ton kho la 10
    const slTonKho = 10;

    // tn cua san pham la iPhone 13
    const keyName = 'iPhone13'

    //Gia su moi lan mua tieu thu la 1
    const slMua = 1

    //So luong da ban ra,neu chua ban thi set = 0, nguoc lai +1
    const getKey = await exists(keyName)
    console.log('Get key', getKey);
    if(!getKey){
        //set = 0
        await set(keyName,0)
        console.log("Đã lưu redis");
    }

    //Lay so luong ban ra
    let slBanRa = await get(keyName) 
    console.log(`Truoc khi user order thanh cong thi so luong ban ra la ${slBanRa}`);
    //Neu so luong ban ra + so luong mua (slMua) > Kho => sai
    if(slBanRa+slMua>slTonKho){
        console.log('Het hang');
        return res.json({
            status:'error',
            message:'Hết hàng',
            time
        })
    }

    //Neu thanh cong
    slBanRa =  await incrby(keyName,slMua) //Atom redis
    console.log(`Sau khi user order thanh cong thi so luong ban ra la ${slBanRa}`);
    if(slBanRa > slTonKho){
        await set('QuaGioiHan',slBanRa - slTonKho)
    }
    return res.json({
        status:'sucess',
        message:'OK',
        time
    })
})

app.listen(3000,()=>{
    console.log('Server running at port ',3000);
})