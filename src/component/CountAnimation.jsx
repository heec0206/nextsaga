import { useEffect, useRef, useState } from 'react'
import * as commonUtils from "/src/utils/common";

export default function useCounter(props) {
  const complate = props.compleate;
  const [compleatea, setCompleatea] = useState({...props.compleate});
  const [count, setCount] = useState(0);
  const ref = useRef(0);

  const countEasingOut = (progressRate) => {
    const remainder = Math.pow(2, -10 * progressRate)
    const maxProgress = 1

    if (progressRate === maxProgress) {
      return maxProgress
    } else {
      return maxProgress - remainder
    }
  }

  if(props.value === count){
    console.log(compleatea)
  }
  
  //console.log(compleatea.idx2 && "compleate2")

  useEffect(() => {
    const onCount = () => {
      const duration = props.duration ? props.duration : 2000
      const frameTimeout = 1000 / 60
      const totalFrame = Math.round(duration / frameTimeout)
      const percentage = countEasingOut(ref.current / totalFrame)
      const currentCount = Math.round(props.value * percentage)

      setCount(currentCount)

      ref.current = ref.current += 1
      const counting = requestAnimationFrame(onCount)
      if (props.value === currentCount) {
        cancelAnimationFrame(counting);
        //complate({...compleatea, ["idx"+props.idx]:true});
        setCompleatea({...compleatea, ["idx"+props.idx]:true});
        //compleate({...compleate, ["idx"+props.idx] : true})
      }
    }

    const counting = requestAnimationFrame(onCount)
    return () => {
      cancelAnimationFrame(counting)
    }
  }, [props.value])

  return props.type === "price" ? commonUtils.priceStr(count) :  count
}
