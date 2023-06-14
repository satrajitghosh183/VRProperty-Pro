import React from 'react'
import Chart from './Chart'
import { InfoState } from './Context';
import group3 from './pics/group-3.svg';
import ellipse from './pics/ellipse-1.svg'
import line3 from './pics/line-3.svg'
import line31 from './pics/line-31.svg'
import line7 from './pics/line-7.svg'
import line32 from './pics/line-32.svg'
import line33 from './pics/line-33.svg'
import line71 from './pics/line-71.svg'
import image16 from './pics/image-16@2x.png'
import { useNavigate } from "react-router-dom";
const Data = () => {
  const {basePrice,setbasePrice} = InfoState();
  const {financialMultiplier,setFinancialMultiplier} = InfoState()
  const {city,setCity} = InfoState();
  const {location,setLocation} = InfoState();
  const {area,setArea} = InfoState();
    const {price,setPrice} = InfoState();
    let navigate = useNavigate();
  const predict_price = basePrice*1.5*financialMultiplier*1*2*1*1.5
  return (
    <>
  <div className="relative bg-black w-full h-[1429px] overflow-hidden text-left text-xl text-white font-roboto">
  <button onClick={()=>{navigate("/user", { replace: true });}} style={{color:'white'}}>&larr;</button>
      <div className="absolute h-[91.02%] w-[12.92%] top-[3.43%] right-[84.17%] bottom-[5.56%] left-[2.92%] hidden text-lg">
        <img
          className="absolute h-[2.65%] w-[98.39%] top-[97.35%] right-[0%] bottom-[0%] left-[1.61%] max-w-full overflow-hidden max-h-full"
          alt=""
          src={group3}
        />
        <div className="absolute top-[531px] left-[4px] tracking-[0.2em] inline-block w-[135px] h-[249px]">
          <p className="[margin-block-start:0] [margin-block-end:25px]">HOME</p>
          <p className="[margin-block-start:0] [margin-block-end:25px]">
            PAGES
          </p>
          <p className="[margin-block-start:0] [margin-block-end:25px]">
            PORTFOLIO
          </p>
          <p className="[margin-block-start:0] [margin-block-end:25px]">BLOG</p>
          <p className="[margin-block-start:0] [margin-block-end:25px]">SHOP</p>
          <p className="m-0">CONTACT</p>
        </div>
        <div className="absolute top-[0px] left-[0px] w-[97px] h-14 text-[40px] font-montserrat">
          <div className="absolute top-[0px] left-[0px] w-[97px] h-[43px]">
            <div className="absolute top-[0px] left-[0px] inline-block w-[97px] h-[43px]">
              ROS
            </div>
            <img
              className="absolute top-[22px] left-[43px] w-[5px] h-[5px]"
              alt=""
              src={ellipse}
            />
          </div>
          <div className="absolute top-[43px] left-[4px] text-[10px] tracking-[0.02em] inline-block w-[91px] h-[13px]">
            ARCHITECTURE
          </div>
        </div>
      </div>
      <div className="absolute top-[162px] left-[1096px] w-[650.11px] h-[537.83px]">
        <div className="absolute top-[0px] left-[0px] text-[45px] font-montserrat inline-block w-[650.11px] h-[148.14px]">{`Information `}</div>
        <div className="absolute top-[70.31px] left-[4.39px] box-border w-[71.78px] h-px border-t-[1px] border-solid border-white" />
        <div className="absolute top-[129px] left-[15px] text-lg tracking-[0.1em] leading-[70px] inline-block w-[620px] h-[388px]">
          <p className="m-0">{`Location`}  :  {location}</p>
          <p className="m-0">&nbsp;</p>
          <p className="m-0">{`Price Now `}  :  {(price/100000)/2000} ETH</p>
          <p className="m-0">&nbsp;</p>
          <p className="m-0">&nbsp;</p>
          <p className="m-0">{`Price in 3 years `}  :  {predict_price}  ETH</p>
        </div>
        <div className="absolute top-[159px] left-[5.98px] w-[614.17px] h-12">
          <div className="absolute top-[41.79px] left-[-0.5px] box-border w-[615.17px] h-px border-t-[1px] border-solid border-white" />
          <img
            className="absolute top-[36.07px] left-[517.48px] w-[20.47px] h-[11.93px]"
            alt=""
            src={line3}
          />
          <div className="absolute top-[0px] left-[518.02px] flex items-center w-[62.07px] h-[20.95px]">{`86 `}</div>
        </div>
        <div className="absolute top-[290px] left-[5.98px] w-[614.17px] h-[49.48px]">
          <div className="absolute top-[40.3px] left-[-0.5px] box-border w-[615.17px] h-px border-t-[1px] border-solid border-white" />
          <img
            className="absolute top-[31.46px] left-[481.66px] w-[20.35px] h-[18.02px]"
            alt=""
            src={line31}
          />
          <div className="absolute top-[0px] left-[518.02px] flex items-center w-[62.07px] h-[31.82px]">{`80 `}</div>
        </div>
        <div className="absolute top-[488px] left-[5.98px] w-[614.17px] h-[49.83px]">
          <div className="absolute top-[40.65px] left-[-0.5px] box-border w-[615.17px] h-px border-t-[1px] border-solid border-white" />
          <img
            className="absolute top-[31.81px] left-[451.17px] w-[20.35px] h-[18.02px]"
            alt=""
            src={line7}
          />
          <div className="absolute top-[0px] left-[507.02px] flex items-center w-[62.07px] h-[31.82px]">
            <span className="[line-break:anywhere] w-full">
              <p className="m-0">7</p>
              <p className="m-0">{`76 `}</p>
            </span>
          </div>
        </div>
      </div>
      <div className="absolute top-[821px] left-[1101px] w-[630.11px] h-[467.02px]">
        <div className="absolute top-[-0.5px] left-[-0.5px] box-border w-[71.78px] h-px border-t-[1px] border-solid border-white" />
        <div className="absolute top-[58.19px] left-[10.11px] text-lg tracking-[0.1em] leading-[70px] inline-block w-[620px] h-[388px]">
          <p className="m-0">{`Area `}  :  {area} sq ft</p>
          <p className="m-0">&nbsp;</p>
          <p className="m-0">{`City `}  :  {city}</p>
          <p className="m-0">&nbsp;</p>
          <p className="m-0">&nbsp;</p>
          {/* <p className="m-0">{`Car Parking `}</p> */}
        </div>
        <div className="absolute top-[88.19px] left-[1.09px] w-[614.17px] h-12">
          <div className="absolute top-[41.79px] left-[-0.5px] box-border w-[615.17px] h-px border-t-[1px] border-solid border-white" />
          <img
            className="absolute top-[36.07px] left-[517.48px] w-[20.47px] h-[11.93px]"
            alt=""
            src={line32}
          />
          <div className="absolute top-[0px] left-[518.02px] flex items-center w-[62.07px] h-[20.95px]">{`86 `}</div>
        </div>
        <div className="absolute top-[219.19px] left-[1.09px] w-[614.17px] h-[49.48px]">
          <div className="absolute top-[40.3px] left-[-0.5px] box-border w-[615.17px] h-px border-t-[1px] border-solid border-white" />
          <img
            className="absolute top-[31.46px] left-[481.66px] w-[20.35px] h-[18.02px]"
            alt=""
            src={line33}
          />
          <div className="absolute top-[0px] left-[518.02px] flex items-center w-[62.07px] h-[31.82px]">{`80 `}</div>
        </div>
        <div className="absolute top-[417.19px] left-[1.09px] w-[614.17px] h-[49.83px]">
          {/* <div className="absolute top-[40.65px] left-[-0.5px] box-border w-[615.17px] h-px border-t-[1px] border-solid border-white" /> */}
          <img
            className="absolute top-[31.81px] left-[451.17px] w-[20.35px] h-[18.02px]"
            alt=""
            src={line71}
          />
          <div className="absolute top-[0px] left-[507.02px] flex items-center w-[62.07px] h-[31.82px]">
            <span className="[line-break:anywhere] w-full">
              <p className="m-0">7</p>
              <p className="m-0">{`76 `}</p>
            </span>
          </div>
        </div>
      </div>
      <img
        className="absolute top-[291px] left-[80px] w-[862px] h-[1020px] object-cover"
        alt=""
        src={image16}
      />
    </div>
    </>
  )
}

export default Data