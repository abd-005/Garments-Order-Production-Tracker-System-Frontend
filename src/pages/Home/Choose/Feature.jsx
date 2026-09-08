import { Card } from '@/components/ui/card'

const Feature = ({ item }) => (
  <Card className="
    choose-item
    tilt-card
    group
    relative
    flex-row
    gap-5
    overflow-hidden
    rounded-3xl
    border-base-300
    p-6
    transition-colors
    duration-500
    hover:border-primary/30
  ">
    <span className="
      absolute
      left-0
      top-0
      h-full
      w-1
      origin-bottom
      scale-y-0
      rounded-full
      bg-linear-to-b
      from-primary
      to-secondary
      transition-transform
      duration-500
      group-hover:scale-y-100
    " />

    <div className="
      choose-icon
      tilt-inner
      flex
      h-18
      w-18
      shrink-0
      items-center
      justify-center
      rounded-2xl
      bg-primary/10
      transition-colors
      duration-500
      group-hover:bg-primary/15
    ">
      <img
        src={item.image}
        alt={item.title}
        className="h-12 w-12 object-contain transition-transform duration-500 group-hover:scale-110"
      />
    </div>

    <div className="flex-1">
      <h3 className="text-xl font-bold text-primary transition-colors duration-500 group-hover:text-base-content">
        {item.title}
      </h3>

      <p className="mt-2 leading-7 text-base-content/70 transition-colors duration-500 group-hover:text-base-content/90">
        {item.description}
      </p>
    </div>
  </Card>
);

export default Feature;
