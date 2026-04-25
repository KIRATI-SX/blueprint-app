import {
  Dialog,
  DialogCloseButton,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type LoginRequiredDialogProps = Readonly<{
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateAccount: () => void
  onLogIn: () => void
}>

export function LoginRequiredDialog({
  open,
  onOpenChange,
  onCreateAccount,
  onLogIn,
}: LoginRequiredDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="relative max-h-[352px] max-w-[621px] gap-0 rounded-3xl p-8 pt-10">
        <DialogCloseButton className="inset-e-4 top-4" />
        <DialogHeader className="px-0 pt-0">
          <DialogTitle
            className="px-1 font-sans text-[1.25rem] leading-7 font-semibold text-brown-800 md:text-[2.5rem] md:leading-12"
          >
            Create an account to continue
          </DialogTitle>
          <DialogDescription className="sr-only">
            Sign in or create an account to use reactions, comments, and other
            features on this page.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 flex w-full flex-col items-center gap-4">
          <button
            type="button"
            onClick={onCreateAccount}
            className="inline-flex h-12 w-full min-w-0 max-w-sm items-center justify-center rounded-full bg-brown-600 px-8 text-base font-medium text-white transition-colors hover:bg-brown-500"
          >
            Create account
          </button>
          <p className="body-3 text-center text-brown-400">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onLogIn}
              className="font-medium text-brown-600 underline underline-offset-2 hover:text-brown-500"
            >
              Log in
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
