import User from './User';
import Sidebar from './Sidebar';

interface IndexLayoutProps {
    children?: React.ReactNode;
}

export default function IndexLayout({ children }: IndexLayoutProps) {
    return (
        <div className="flex">
            <Sidebar />
            {children}
        </div>
    );
}
