import Button from '~/components/Button/Button';

function NavSubItem({ item }) {
  return (
    <div className="relative">
      <Button className="justify-between w-full" leftIcon={item.icon} to={item.to} medium text>
        {item.title}
      </Button>
    </div>
  );
}

export default NavSubItem;
