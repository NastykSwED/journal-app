type ImageGalleryProps = {
	images: string[];
};

interface NavbarProps {
	open: boolean;
	handleDrawerClose: () => void;
	handleDrawerOpen: () => void;
}

type SideBarProps = Pick<NavbarProps, 'open', 'handleDrawerClose'>;

type SideBarItemProps = onNote;
