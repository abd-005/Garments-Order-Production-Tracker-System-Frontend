const Feature = ({ item }) => (
  <div className="
    choose-item
    group
    flex
    gap-5
    rounded-3xl
    border
    border-base-300
    bg-base-100/80
    backdrop-blur-xl
    p-6
    transition-all
    duration-500
    hover:-translate-y-1.5
    hover:shadow-2xl
    hover:border-primary/30
    hover:shadow-primary/5
  ">
    <div className="
      choose-icon
      flex
      h-18
      w-18
      shrink-0
      items-center
      justify-center
      rounded-2xl
      bg-primary/10
      transition-all
      duration-500
      group-hover:rotate-6
      group-hover:scale-110
      group-hover:bg-primary/15
    ">
      <img
        src={item.image}
        alt={item.title}
        className="h-12 w-12 object-contain"
      />
    </div>

    <div className="flex-1">
      <h3 className="text-xl font-bold text-primary">
        {item.title}
      </h3>

      <p className="mt-2 leading-7 text-base-content/70">
        {item.description}
      </p>
    </div>
  </div>
);

export default Feature;
