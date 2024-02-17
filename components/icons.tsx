import {
    ArrowRight,
    Check,
    ChevronLeft,
    ChevronRight,
    File,
    FileText,
    Loader2,
    MoreVertical,
    Plus,
    Trash,
    User,
    X,
    LogOut,
    PanelsTopLeft,
    type LucideIcon,
    FileStack,
} from "lucide-react"

export type Icon = LucideIcon

export const Icons = {
    logo: FileStack,
    x: X,
    dashboard: PanelsTopLeft,
    logout: LogOut,
    loader: Loader2,
    chevronLeft: ChevronLeft,
    chevronRight: ChevronRight,
    trash: Trash,
    fileText: FileText,
    file: File,
    more: MoreVertical,
    plus: Plus,
    user: User,
    arrowRight: ArrowRight,
    check: Check,
}