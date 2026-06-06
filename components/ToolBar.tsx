"use client";

import { useState } from "react";
import { Building, Plus, User } from "lucide-react";

import { Button } from "./ui/button";
import PeopleSearchDialog from "./people-search/PeopleSearchDialog";

const ToolBar = () => {
  const [openPeopleDialog, setOpenPeopleDialog] = useState(false);

  return (
    <>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-medium">Welcome back, Tim</h1>
          <p className="text-muted-foreground">
            Here's your daily scoop on Bitscale!
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">
            <Building className="text-green-700" />
            <span>Find Companies</span>
          </Button>

          <Button variant="outline" onClick={() => setOpenPeopleDialog(true)}>
            <User />
            <span>Find People</span>
          </Button>

          <Button>
            <Plus />
            <span>New Grid</span>
          </Button>
        </div>
      </div>

      <PeopleSearchDialog
        open={openPeopleDialog}
        onOpenChange={setOpenPeopleDialog}
      />
    </>
  );
};

export default ToolBar;