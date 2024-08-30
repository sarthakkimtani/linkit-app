import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";

import EditLink from "@/components/dashboard/EditLink";

interface LinksListProps {
  links: Array<Link>;
  setLinks: React.Dispatch<React.SetStateAction<Link[]>>;
  updateLinkHandler: (oldLink: Link, newLink: Link) => Promise<void>;
  updateLinkOrderHandler: (links: Link[]) => Promise<void>;
  deleteLinkHandler: (link: Link) => Promise<void>;
}

function LinksList({
  links,
  setLinks,
  updateLinkHandler,
  updateLinkOrderHandler,
  deleteLinkHandler,
}: LinksListProps) {
  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const newLinks = Array.from(links);
    const [reorderedItem] = newLinks.splice(result.source.index, 1);
    newLinks.splice(result.destination.index, 0, reorderedItem);

    const updatedLinks = newLinks.map((link, index) => ({
      ...link,
      order: index + 1,
    }));

    setLinks(updatedLinks);
    await updateLinkOrderHandler(updatedLinks);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="links">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-col lg:overflow-y-auto lg:max-h-[70%] lg:scrollbar-width-none mt-12"
          >
            {links.map((link, index) => (
              <Draggable key={link.id} draggableId={link.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <EditLink
                      link={link}
                      onDelete={deleteLinkHandler}
                      onUpdate={updateLinkHandler}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default LinksList;
