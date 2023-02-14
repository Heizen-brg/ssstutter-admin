import Button from '~/components/Button/Button';

function NavSubItem({ item }) {
  return (
    <div className="relative">
      <Button className="ml-2 justify-between w-full" leftIcon={item.icon} to={item.to} medium text>
        {item.title}
      </Button>
    </div>
  );
}

export default NavSubItem;
