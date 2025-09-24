import * as React from "react"

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
}

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterProps = {
  toasts: ToasterToast[]
  toast: (toast: Omit<ToasterToast, "id">) => {
    id: string
    dismiss: () => void
    update: (props: ToasterToast) => void
  }
  dismiss: (toastId?: string) => void
}

const initialState: ToasterProps = {
  toasts: [],
  toast: () => {
    throw new Error("You can't use toast outside of a Toaster provider")
  },
  dismiss: () => {
    throw new Error("You can't use dismiss outside of a Toaster provider")
  },
}

const ToasterContext = React.createContext<ToasterProps>(initialState)

export function useToast() {
  const context = React.useContext(ToasterContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToasterProvider")
  }
  return context
}

export function ToasterProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToasterToast[]>([])

  const toast = React.useCallback(
    (props: Omit<ToasterToast, "id">) => {
      const id = Math.random().toString(36).substr(2, 9)
      const newToast = { id, ...props }
      setToasts((prev) => [newToast, ...prev].slice(0, TOAST_LIMIT))

      const dismiss = () => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }

      const update = (props: ToasterToast) => {
        setToasts((prev) =>
          prev.map((t) => (t.id === id ? { ...t, ...props } : t))
        )
      }

      setTimeout(() => {
        dismiss()
      }, TOAST_REMOVE_DELAY)

      return { id, dismiss, update }
    },
    []
  )

  const dismiss = React.useCallback((toastId?: string) => {
    if (toastId) {
      setToasts((prev) => prev.filter((t) => t.id !== toastId))
    } else {
      setToasts([])
    }
  }, [])

  return (
    <ToasterContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
    </ToasterContext.Provider>
  )
}

interface ToastProps extends React.ComponentPropsWithoutRef<typeof Toast> {}
