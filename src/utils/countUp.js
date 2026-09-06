import { gsap } from 'gsap'

const countUp = (scopeEl, selector, { duration = 1.8, ease = 'power2.out', format } = {}) => {
  gsap.utils.toArray(selector, scopeEl).forEach((el) => {
    const target = Number(el.dataset.value)
    const obj = { val: 0 }

    gsap.to(obj, {
      val: target,
      duration,
      ease,
      onUpdate: () => {
        el.textContent = format
          ? format(Math.floor(obj.val))
          : Math.floor(obj.val).toLocaleString('en-US')
      },
    })
  })
}

export default countUp